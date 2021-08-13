import { Request, Response } from "express";
import fetch from "node-fetch";
import pkceChallenge from "pkce-challenge";
import dayjs from "dayjs";
import { encrypt } from "./utils/encryption";
import { JWTverify, JWTsign } from "./utils/jwt";
import { User } from "../../models/user";

interface userJWT {
  mal_id: number;
  username: string;
  iat: string;
  exp: string;
}

function getAuthenticationLink(redirect: string): string {
  const challenge = pkceChallenge(128).code_verifier;
  const encryptedChallenge = encrypt(challenge);
  return `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.MAL_CLIENT_ID}&code_challenge=${challenge}&state=${encryptedChallenge}|${redirect}`;
}

export default async function Auth(req: Request, res: Response) {
  const user: string = (req.query.user as string) ?? "";
  const redirect: "stats" | "home" =
    req.query.redirect === "stats" ? "stats" : "home";
  let decodedUserJWT: userJWT;

  if (user !== "") {
    try {
      decodedUserJWT = JWTverify(user);
    } catch (err) {
      return res.sendStatus(400);
    }
    try {
      const user = await User.findOne({ mal_id: decodedUserJWT.mal_id });
      if (user === null) {
        return res.sendStatus(400);
      }
      const timeDifference = dayjs().diff(user.updated_on, "hours");
      // send the user back if the access token is less than 1 hour old
      if (timeDifference < 1) {
        return res.redirect(`${process.env.FRONTEND_URL}${redirect}`);
        // refresh the access token if the current one is > 1 day old and < 30 days old
      } else if (timeDifference > 1 && timeDifference < 720) {
        // 720 hours == 1 month (30 days)
        const tokenResponse = await fetch(
          "https://myanimelist.net/v1/oauth2/token",
          {
            method: "post",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `client_id=${process.env.MAL_CLIENT_ID}&client_secret=${process.env.MAL_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${user.refresh_token}`,
          }
        );
        if (!tokenResponse.ok && tokenResponse.status !== 200) {
          return res.sendStatus(400);
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
          return res.sendStatus(400);
        }
        const userJSON = await userResponse.json();
        const userObject = {
          updated_on: new Date(),
          mal_id: userJSON.id,
          username: userJSON.name,
          access_token: tokenJSON.access_token,
          refresh_token: tokenJSON.refresh_token,
        };
        await User.findOneAndUpdate({ mal_id: userJSON.id }, userObject, {
          upsert: true,
          useFindAndModify: false,
        });
        return res.redirect(
          `${process.env.FRONTEND_URL}/auth?jwt=${JWTsign(
            userJSON.id,
            userJSON.name
          )}&redirect=${redirect}`
        );
        // send the user an authentication link if the access token is more than 1 month old
      } else if (timeDifference > 720) {
        return res.redirect(getAuthenticationLink(redirect));
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  } else {
    return res.redirect(getAuthenticationLink(redirect));
  }
}
