import { HandlerEvent, HandlerContext } from '@netlify/functions';
import fetch from 'node-fetch';
import { MongoClient } from 'mongodb';
import { decrypt } from './utils/encryption';
import { setUserCookie } from './utils/cookies';

const client = new MongoClient(process.env.MONGODB_URI);

export async function handler(event: HandlerEvent, context: HandlerContext) {
  context.callbackWaitsForEmptyEventLoop = false;
  const code: string = event.queryStringParameters.code;
  const state: string = event.queryStringParameters.state;
  
  if (!code || !state) {
    return {
      statusCode: 400,
      body: '400 Bad Request',
    };
  }

  try {
    const tokenResponse = await fetch('https://myanimelist.net/v1/oauth2/token', {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `client_id=${process.env.MAL_CLIENT_ID}&client_secret=${process.env.MAL_CLIENT_SECRET}&grant_type=authorization_code&code=${code}&code_verifier=${decrypt(state)}`
    });
    if (!tokenResponse.ok && tokenResponse.status !== 200) {
      return {
        statusCode: 400,
        body: '400 Bad Request',
      };
    }
    const tokenJSON = await tokenResponse.json();

    const userResponse = await fetch('https://api.myanimelist.net/v2/users/@me', {
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${tokenJSON.access_token}`
      }
    })
    if (!userResponse.ok && userResponse.status !== 200) {
      return {
        statusCode: 400,
        body: '400 Bad Request',
      };
    }
    const userJSON = await userResponse.json()

    await client.connect();
    const db = client.db('database');
    const userObject = {
      updated_on: new Date(),
      mal_id: userJSON.id,
      username: userJSON.name,
      access_token: tokenJSON.access_token,
      refresh_token: tokenJSON.refresh_token
    }
    db.collection('users').updateOne({ mal_id: userJSON.id }, { $set: userObject }, { upsert: true }, (err) => {
      if (err) throw err;
    })
    return { 
      statusCode: 200,
      headers: {
        'Set-Cookie': setUserCookie(userJSON.id, userJSON.name)
      },
      body: JSON.stringify(tokenJSON) 
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: '400 Bad Request',
    };
  }
}