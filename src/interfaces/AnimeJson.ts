export default interface AnimeStatistics {
  overview: Overview;
  scores: ScoresEntity[];
  episode_count: EpisodeCountEntity[];
  format_distribution: FormatDistributionEntity[];
  status_distribution: StatusDistributionEntity[];
  release_years: ReleaseYearsWatchYearsEntity[];
  watch_years: ReleaseYearsWatchYearsEntity[];
  genres: GenresStudiosEntity[];
  studios: GenresStudiosEntity[];
  all_animes: AllAnimesEntity[];
}
export interface Overview {
  total_anime: number;
  episodes_watched: number;
  time_watched: number;
  mean_score: number;
  standard_deviation: number;
}
export interface ScoresEntity {
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
export interface FormatDistributionEntity {
  format: string;
  count: number;
  time_watched: number;
  mean_score: number;
}
export interface StatusDistributionEntity {
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
export interface AllAnimesEntity {
  id: number;
  title: string;
  image_url_id: string;
  title_en: string;
  title_ja: string;
}
