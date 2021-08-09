import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import { User } from "../models/user";
import { getAnimeStats } from "./animeController";
import { getMangaStats } from "./mangaController";

interface userJWT {
  mal_id: number;
  username: string;
  iat: string;
  exp: string;
}

interface Stats {
  version: string;
  generated_on: Date;
  mal_id: number;
  username: string;
  anime_statistics: Object;
  manga_statistics: Object;
}

async function getStatsJSON(
  access_token: string,
  mal_id: number,
  username: string
): Promise<Stats> {
  let json: Stats = {
    version: "1.0.0",
    generated_on: new Date(),
    mal_id: mal_id,
    username: username,
    anime_statistics: {},
    manga_statistics: {},
  };
  try {
    json.anime_statistics = await getAnimeStats(access_token);
    json.manga_statistics = await getMangaStats(access_token);
    return json;
  } catch (err) {
    throw err;
  }
}

export function getFullStats(req: Request, res: Response) {
  const user: string = req.body.user;
  let decodedUserJWT: userJWT;
  if (user) {
    try {
      decodedUserJWT = jwt.verify(
        user,
        process.env.JWT_TOKEN_SECRET as string
      ) as userJWT;
      User.findOne({ mal_id: decodedUserJWT.mal_id }, (err: any, user: any) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          if (user === null) {
            return res.sendStatus(404);
          } else {
            if (dayjs().diff(user.updated_on, "hours") >= 1) {
              return res.sendStatus(401);
            }
            /* getFullList(user.access_token)
              .then((response) =>
                getStatsJSON(
                  response,
                  decodedUserJWT.mal_id,
                  decodedUserJWT.username
                )
                  .then((response) => res.json(response))
                  .catch((err) => res.send(err))
              )
              .catch((err) => res.send(err)); */
            getStatsJSON(
              user.access_token,
              decodedUserJWT.mal_id,
              decodedUserJWT.username
            )
              .then((response) => res.json(response))
              .catch((err) => res.send(err));
          }
        }
      });
    } catch (err) {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
}
