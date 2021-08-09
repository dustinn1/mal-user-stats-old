import { HandlerEvent, HandlerContext } from "@netlify/functions";
import pkceChallenge from "pkce-challenge";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import dayjs from "dayjs";
import { MongoClient } from "mongodb";
import { encrypt } from "./utils/encryption";
import { setUserCookie } from "./utils/cookies";

interface userJWT {
  mal_id: number;
  username: string;
  iat: string;
  exp: string;
}

function getAuthenticationLink(redirect: string) {
  const challenge = pkceChallenge(128).code_verifier;
  const encryptedChallenge = encrypt(challenge);

  return {
    statusCode: 302,
    headers: {
      Location: `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.MAL_CLIENT_ID}&code_challenge=${challenge}&state=${encryptedChallenge}|${redirect}`,
      "Cache-Control": "no-cache",
    },
  };
}

const client = new MongoClient(process.env.MONGODB_URI);

export async function handler(event: HandlerEvent, context: HandlerContext) {
  context.callbackWaitsForEmptyEventLoop = false;
  const user: string = event.queryStringParameters.user;
  const redirect: string =
    event.queryStringParameters.redirect === "stats" ? "stats" : "home";
  let decodedUserJWT: userJWT;

  if (user) {
    try {
      decodedUserJWT = jwt.verify(
        user,
        process.env.JWT_TOKEN_SECRET
      ) as unknown as userJWT;
    } catch (err) {
      return {
        statusCode: 400,
        body: "400 Bad Request",
      };
    }
    await client.connect();
    const db = client.db("database");
    try {
      const userResult = await db
        .collection("users")
        .findOne({ mal_id: decodedUserJWT.mal_id });
      const currentTime = dayjs();
      const difference = currentTime.diff(userResult.updated_on, "hours");
      // send the user back if the access token is less than 1 hour old
      if (difference < 1) {
        return {
          statusCode: 302,
          headers: {
            Location: `${redirect === "stats" ? "/stats" : "/"}`,
            "Cache-Control": "no-cache",
          },
        };
        // refresh the access token if the current one is > 1 day old and < 30 days old
      } else if (difference > 1 && difference < 720) {
        // 720 hours == 1 month (30 days)
        const tokenResponse = await fetch(
          "https://myanimelist.net/v1/oauth2/token",
          {
            method: "post",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `client_id=${process.env.MAL_CLIENT_ID}&client_secret=${process.env.MAL_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${userResult.refresh_token}`,
          }
        );
        if (!tokenResponse.ok && tokenResponse.status !== 200) {
          return {
            statusCode: 400,
            body: "400 Bad Request",
          };
        }
        const tokenJSON = await tokenResponse.json();
        const userResponse = await fetch(
          "https://api.myanimelist.net/v2/users/@me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenJSON.access_token}`,
            },
          }
        );
        if (!userResponse.ok && userResponse.status !== 200) {
          return {
            statusCode: 400,
            body: "400 Bad Request",
          };
        }
        const userJSON = await userResponse.json();
        const userObject = {
          updated_on: new Date(),
          mal_id: userJSON.id,
          username: userJSON.name,
          access_token: tokenJSON.access_token,
          refresh_token: tokenJSON.refresh_token,
        };
        db.collection("users").updateOne(
          { mal_id: userJSON.id },
          { $set: userObject },
          { upsert: true },
          (err) => {
            if (err) throw err;
          }
        );
        return {
          statusCode: 302,
          headers: {
            "Set-Cookie": setUserCookie(userJSON.id, userJSON.name),
            Location: `${redirect === "stats" ? "/stats" : "/"}`,
            "Cache-Control": "no-cache",
          },
        };
        // send the user an authentication link if the access token is more than 1 month old
      } else if (difference > 720) {
        return getAuthenticationLink(redirect);
      }
    } catch (err) {
      return {
        statusCode: 400,
        body: "400 Bad Request",
      };
    }
  } else if (!user) {
    return getAuthenticationLink(redirect);
  }
}
