import fetch from "node-fetch";
import { test } from "../json/manga_test";

import overviewStats from "./mangaStats/overview";
import scoreStats from "./mangaStats/scores";
import chapterCountStats from "./mangaStats/chapterCount";
import volumeCountStats from "./mangaStats/volumeCount";
import formatStats from "./mangaStats/format";
import statusStats from "./mangaStats/status";
import releaseYearStats from "./mangaStats/releaseYear";
import readYearStats from "./mangaStats/readYear";
import genreStats from "./mangaStats/genres";
import allMangas from "./mangaStats/mangas";

interface Stats {
  overview: Object;
  scores: Array<Object>;
  chapter_count: Array<Object>;
  volume_count: Array<Object>;
  format_distribution: Array<Object>;
  status_distribution: Array<Object>;
  release_years: Array<Object>;
  read_years: Array<Object>;
  genres: Array<Object>;
  all_mangas: Array<Object>;
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
        }&fields=alternative_titles,start_date,end_date,mean,genres,media_type,my_list_status{num_times_reread},num_volumes,num_chapters`,
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
            manga.node.chapters_read =
              (manga.node.my_list_status.num_times_reread +
                (manga.node.my_list_status.is_rereading ? 1 : 0)) *
                manga.node.num_chapters +
              manga.node.my_list_status.num_chapters_read;
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

async function getStatsJSON(mangaList: Array<any>): Promise<Stats> {
  let json: Stats = {
    overview: {},
    scores: [],
    chapter_count: [],
    volume_count: [],
    format_distribution: [],
    status_distribution: [],
    release_years: [],
    read_years: [],
    genres: [],
    all_mangas: [],
  };
  try {
    json.overview = await overviewStats(mangaList);
    json.scores = await scoreStats(mangaList);
    json.chapter_count = await chapterCountStats(mangaList);
    json.volume_count = await volumeCountStats(mangaList);
    json.format_distribution = await formatStats(mangaList);
    json.status_distribution = await statusStats(mangaList);
    json.release_years = await releaseYearStats(mangaList);
    json.read_years = await readYearStats(mangaList);
    json.genres = await genreStats(mangaList);
    json.all_mangas = await allMangas(mangaList);
    return json;
  } catch (err) {
    throw err;
  }
}

export function getMangaStats(access_token: string): Promise<Stats> {
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
