import { Request, Response } from "express";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { User } from "../models/user";

import overallStats from "./animeStats/overall";
import scoresStats from "./animeStats/scores";
import episodeCountStats from "./animeStats/episodeCount";
import formatStats from "./animeStats/format";
import statusStats from "./animeStats/status";
import releaseYearStats from "./animeStats/releaseYear";
import watchYearStats from "./animeStats/watchYear";
import genreStats from "./animeStats/genres";
import studioStats from "./animeStats/studios";
import allAnimes from "./animeStats/animes";

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
  statistics: {
    overview: Object;
    scores: Array<Object>;
    episode_count: Array<Object>;
    format_distribution: Array<Object>;
    status_distribution: Array<Object>;
    release_years: Array<Object>;
    watch_years: Array<Object>;
    genres: Array<Object>;
    studios: Array<Object>;
  };
  animes: Array<Object>;
}

async function getFullList(access_token: string): Promise<Object[]> {
  let list: Array<Object> = [];
  let isEnd: boolean = false;
  let offset: number = 0;
  try {
    do {
      await fetch(
        `https://api.myanimelist.net/v2/users/@me/mangalist?limit=1000&nsfw=1&offset=${
          1000 * offset
        }&fields=alternative_titles,start_date,end_date,mean,rank,genres,media_type,my_list_status,num_volumes,num_chapters`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          let data = response.data;
          for (let manga of data) {
            let image_url_split = manga.node.main_picture.medium.split("/");
            manga.node.image_url_id = `${image_url_split[5]}/${
              image_url_split[6].split(".")[0]
            }`;
            /* manga.node.time_watched =
              manga.node.my_list_status.num_episodes_watched *
              manga.node.average_episode_duration; */
            manga.node.title_en =
              manga.node.alternative_titles.en.length !== 0
                ? manga.node.alternative_titles.en
                : manga.node.title;
            manga.node.title_ja =
              manga.node.alternative_titles.ja.length !== 0
                ? manga.node.alternative_titles.ja
                : manga.node.title;
            list.push(manga.node);
          }
          if (response.paging.next === undefined) {
            isEnd = true;
          } else {
            offset++;
          }
        })
        .catch((err) => console.log(err));
    } while (!isEnd);
    return list;
  } catch (err) {
    throw err;
  }
}

async function getStatsJSON(
  animeList: Array<any>,
  mal_id: number,
  username: string
): Promise<Stats> {
  let json: Stats = {
    version: "1.0.0",
    generated_on: new Date(),
    mal_id: mal_id,
    username: username,
    statistics: {
      overview: {},
      scores: [],
      episode_count: [],
      format_distribution: [],
      status_distribution: [],
      release_years: [],
      watch_years: [],
      genres: [],
      studios: [],
    },
    animes: [],
  };
  try {
    json.statistics.overview = await overallStats(animeList);
    json.statistics.scores = await scoresStats(animeList);
    json.statistics.episode_count = await episodeCountStats(animeList);
    json.statistics.format_distribution = await formatStats(animeList);
    json.statistics.status_distribution = await statusStats(animeList);
    json.statistics.release_years = await releaseYearStats(animeList);
    json.statistics.watch_years = await watchYearStats(animeList);
    json.statistics.genres = await genreStats(animeList);
    json.statistics.studios = await studioStats(animeList);
    json.animes = await allAnimes(animeList);
    return json;
  } catch (err) {
    throw err;
  }
}

export function getStats(req: Request, res: Response) {
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
              .catch((err) => res.send(err));
            getStatsJSON(test, decodedUserJWT.mal_id, decodedUserJWT.username)
              .then((response) => res.json(response))
              .catch((err) => res.send(err)); */
            getFullList(user.access_token)
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
