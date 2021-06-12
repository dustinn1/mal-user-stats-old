import { Helmet } from 'react-helmet-async';
import pkceChallenge from 'pkce-challenge';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Login() {
  const challenge = pkceChallenge(128);
  const state: string = crypto.randomBytes(32).toString('hex');

  function generateJWT(): string {
    return jwt.sign({
      challenge: challenge,
      state: state
    },
    process.env.REACT_APP_JWT_TOKEN_SECRET as string,
    {
      expiresIn: '120s'
    })
  }

  function createCookie(): void {
    document.cookie = `jwt=${generateJWT()}; max-age=120; secure; samesite=strict; path=/;`
  }

  return (
    <>
      <Helmet>
        <title>Log in</title>
      </Helmet>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Card>
          <Card.Body>
            <Card.Title className="text-center fs-1">MyAnimeList User Stats</Card.Title>
            <div className="d-grid gap-2">
              <Button
                variant="primary" 
                size="lg" 
                className="mt-3"
                onClick={createCookie}
                //href={`https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=a8af111e69995b55c9b4d12e5c623b96&code_challenge=${challenge.code_challenge}`}
              >
                Log in with MyAnimeList
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}
