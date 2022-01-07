import AnimeJson from "../../interfaces/AnimeJson";
import overviewStats from "./overview";
import scoresStats from "./scores";
import episodeCountStats from "./episodeCount";
import formatStats from "./format";
import statusStats from "./status";
import releaseYearStats from "./releaseYear";
import watchYearStats from "./watchYear";
import genresStats from "./genres";
import studiosStats from "./studios";
import allAnimes from "./animes";

export default async function statsGenerateAnime(
  animeList: Array<any>
): Promise<AnimeJson | null> {
  let stats: AnimeJson = {
    overview: {
      total_anime: 0,
      episodes_watched: 0,
      time_watched: 0,
      mean_score: 0,
      standard_deviation: 0,
    },
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
    stats.overview = await overviewStats(animeList);
    stats.scores = await scoresStats(animeList);
    stats.episode_count = await episodeCountStats(animeList);
    stats.format_distribution = await formatStats(animeList);
    stats.status_distribution = await statusStats(animeList);
    stats.release_years = await releaseYearStats(animeList);
    stats.watch_years = await watchYearStats(animeList);
    stats.genres = await genresStats(animeList);
    stats.studios = await studiosStats(animeList);
    stats.all_animes = await allAnimes(animeList);
    return stats;
  } catch (err) {
    console.error(err);
  }
  return null;
}
