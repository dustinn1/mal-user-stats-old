export default interface statsJSON {
  version: string;
  generated_on: string;
  mal_id: number;
  username: string;
  anime_statistics: AnimeStatistics;
  manga_statistics: MangaStatistics;
}
export interface AnimeStatistics {
  overview: AnimeOverview;
  scores: AnimeScoresEntity[];
  episode_count: EpisodeCountEntity[];
  format_distribution: AnimeFormatDistributionEntity[];
  status_distribution: AnimeStatusDistributionEntity[];
  release_years: ReleaseYearsWatchYearsEntity[];
  watch_years: ReleaseYearsWatchYearsEntity[];
  genres: GenresStudiosEntity[];
  studios: GenresStudiosEntity[];
  all_animes: AllAnimesAllMangasEntity[];
}
export interface AnimeOverview {
  total_anime: number;
  episodes_watched: number;
  time_watched: number;
  mean_score: number;
  standard_deviation: number;
}
export interface AnimeScoresEntity {
  score: number;
  count: number;
  time_watched: number;
  mean_score: number;
}
export interface EpisodeCountEntity {
  length: string;
  count: number;
  time_watched: number;
  mean_score: number;
}
export interface AnimeFormatDistributionEntity {
  format: string;
  count: number;
  time_watched: number;
  mean_score: number;
}
export interface AnimeStatusDistributionEntity {
  status: string;
  count: number;
  time_watched: number;
  mean_score: number;
}
export interface ReleaseYearsWatchYearsEntity {
  year: number;
  count: number;
  time_watched: number;
  mean_score: number;
}
export interface GenresStudiosEntity {
  id: number;
  name: string;
  count: number;
  mean_score: number;
  time_watched: number;
  top_animes: number[];
  all_animes: number[];
}
export interface AllAnimesAllMangasEntity {
  id: number;
  title: string;
  image_url_id: string;
  title_en: string;
  title_ja: string;
}
export interface MangaStatistics {
  overview: MangaOverview;
  scores: MangaScoresEntity[];
  chapter_count: ChapterCountVolumeCountEntity[];
  volume_count: ChapterCountVolumeCountEntity[];
  format_distribution: MangaFormatDistributionEntity[];
  status_distribution: MangaStatusDistributionEntity[];
  release_years: ReleaseYearsReadYearsEntity[];
  read_years: ReleaseYearsReadYearsEntity[];
  genres: GenresEntity[];
  all_mangas: AllAnimesAllMangasEntity[];
}
export interface MangaOverview {
  total_manga: number;
  chapters_read: number;
  volumes_read: number;
  mean_score: number;
  standard_deviation: number;
}
export interface MangaScoresEntity {
  score: number;
  count: number;
  chapters_read: number;
  mean_score: number;
}
export interface ChapterCountVolumeCountEntity {
  length: string;
  count: number;
  chapters_read: number;
  mean_score: number;
}
export interface MangaFormatDistributionEntity {
  format: string;
  count: number;
  chapters_read: number;
  mean_score: number;
}
export interface MangaStatusDistributionEntity {
  status: string;
  count: number;
  chapters_read: number;
  mean_score: number;
}
export interface ReleaseYearsReadYearsEntity {
  year: number;
  count: number;
  chapters_read: number;
  mean_score: number;
}
export interface GenresEntity {
  id: number;
  name: string;
  count: number;
  chapters_read: number;
  mean_score: number;
  top_mangas: number[];
  all_mangas: number[];
}
