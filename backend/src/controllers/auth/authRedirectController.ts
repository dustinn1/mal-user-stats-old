import { Request, Response } from "express";
import fetch from "node-fetch";
import { decrypt } from "./utils/encryption";
import { JWTsign } from "./utils/jwt";
import { User } from "../../models/user";

export default async function AuthRedirect(req: Request, res: Response) {
  const code: string = (req.query.code as string) ?? "";
  const state: string = (req.query.state as string) ?? "";
  const verifier: string = state.split("|")[0];
  const redirect: "stats" | "home" =
    state.split("|")[1] === "stats" ? "stats" : "home";

  if (code === "" || state === "") {
    return res.sendStatus(400);
  }

  try {
    const tokenResponse = await fetch(
      "https://myanimelist.net/v1/oauth2/token",
      {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `client_id=${process.env.MAL_CLIENT_ID}&client_secret=${
          process.env.MAL_CLIENT_SECRET
        }&grant_type=authorization_code&code=${code}&code_verifier=${decrypt(
          verifier
        )}`,
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
  } catch (err) {
    return res.status(400).send(err);
  }
}
