import fetch from "node-fetch";
import { test } from "../json/anime_test";

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

interface Stats {
  overview: Object;
  scores: Array<Object>;
  episode_count: Array<Object>;
  format_distribution: Array<Object>;
  status_distribution: Array<Object>;
  release_years: Array<Object>;
  watch_years: Array<Object>;
  genres: Array<Object>;
  studios: Array<Object>;
  all_animes: Array<Object>;
}

async function getFullList(access_token: string): Promise<Object[]> {
  let list: Array<Object> = [];
  let isEnd: boolean = false;
  let offset: number = 0;
  try {
    do {
      await fetch(
        `https://api.myanimelist.net/v2/users/@me/animelist?limit=1000&nsfw=1&offset=${
          1000 * offset
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

async function getStatsJSON(animeList: Array<any>): Promise<Stats> {
  let json: Stats = {
    overview: {},
    scores: [],
    episode_count: [],
    format_distribution: [],
    status_distribution: [],
    release_years: [],
    watch_years: [],
    genres: [],
    studios: [],
    all_animes: [],
  };
  try {
    json.overview = await overallStats(animeList);
    json.scores = await scoresStats(animeList);
    json.episode_count = await episodeCountStats(animeList);
    json.format_distribution = await formatStats(animeList);
    json.status_distribution = await statusStats(animeList);
    json.release_years = await releaseYearStats(animeList);
    json.watch_years = await watchYearStats(animeList);
    json.genres = await genreStats(animeList);
    json.studios = await studioStats(animeList);
    json.all_animes = await allAnimes(animeList);
    return json;
  } catch (err) {
    throw err;
  }
}

export function getAnimeStats(access_token: string): Promise<Stats> {
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
  try {
    return getStatsJSON(test);
  } catch (err) {
    return err;
  }
}
