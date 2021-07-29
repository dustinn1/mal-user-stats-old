import { Request, Response } from "express";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { User } from "../models/user";
import { test } from "../json/test";

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
  let numOfAnimes: number;
  try {
    let response = await fetch(
      "https://api.myanimelist.net/v2/users/@me?fields=anime_statistics",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    let responseData = await response.json();
    numOfAnimes = responseData.anime_statistics.num_items;
    for (let i = 0; i <= Math.floor(numOfAnimes / 1000); i++) {
      await fetch(
        `https://api.myanimelist.net/v2/users/@me/animelist?limit=1000&nsfw=1&offset=${
          1000 * i
        }&fields=alternative_titles,start_date,end_date,mean,rank,genres,media_type,status,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,studios`,
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
          for (let anime of data) {
            let image_url_split = anime.node.main_picture.medium.split("/");
            anime.node.image_url_id = `${image_url_split[5]}/${
              image_url_split[6].split(".")[0]
            }`;
            anime.node.time_watched =
              anime.node.my_list_status.num_episodes_watched *
              anime.node.average_episode_duration;
            anime.node.title_en =
              anime.node.alternative_titles.en.length !== 0
                ? anime.node.alternative_titles.en
                : anime.node.title;
            anime.node.title_ja =
              anime.node.alternative_titles.ja.length !== 0
                ? anime.node.alternative_titles.ja
                : anime.node.title;
            list.push(anime.node);
          }
        })
        .catch((err) => console.log(err));
    }
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
              .catch((err) => res.send(err)); */
            getStatsJSON(test, decodedUserJWT.mal_id, decodedUserJWT.username)
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
