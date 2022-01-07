import MangaJson from "../../interfaces/MangaJson";
import overviewStats from "./overview";
import scoresStats from "./scores";
import chapterCountStats from "./chapterCount";
import volumeCountStats from "./volumeCount";
import formatStats from "./format";
import statusStats from "./status";
import releaseYearStats from "./releaseYear";
import readYearStats from "./readYear";
import genresStats from "./genres";
import allMangas from "./mangas";

export default async function statsGenerateManga(
  mangaList: Array<any>
): Promise<MangaJson | null> {
  let stats: MangaJson = {
    overview: {
      total_manga: 0,
      chapters_read: 0,
      volumes_read: 0,
      mean_score: 0,
      standard_deviation: 0,
    },
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
    stats.overview = await overviewStats(mangaList);
    stats.scores = await scoresStats(mangaList);
    stats.chapter_count = await chapterCountStats(mangaList);
    stats.volume_count = await volumeCountStats(mangaList);
    stats.format_distribution = await formatStats(mangaList);
    stats.status_distribution = await statusStats(mangaList);
    stats.release_years = await releaseYearStats(mangaList);
    stats.read_years = await readYearStats(mangaList);
    stats.genres = await genresStats(mangaList);
    stats.all_mangas = await allMangas(mangaList);
    return stats;
  } catch (err) {
    console.error(err);
  }
  return null;
}
