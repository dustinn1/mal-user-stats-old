export default interface MangaStatistics {
  overview: Overview;
  scores: ScoresEntity[];
  chapter_count: ChapterVolumeCountEntity[];
  volume_count: ChapterVolumeCountEntity[];
  format_distribution: FormatDistributionEntity[];
  status_distribution: StatusDistributionEntity[];
  release_years: ReleaseYearsReadYearsEntity[];
  read_years: ReleaseYearsReadYearsEntity[];
  genres: GenresEntity[];
  all_mangas: AllMangasEntity[];
}
export interface Overview {
  total_manga: number;
  chapters_read: number;
  volumes_read: number;
  mean_score: number;
  standard_deviation: number;
}
export interface ScoresEntity {
  score: number;
  count: number;
  chapters_read: number;
  mean_score: number;
}
export interface ChapterVolumeCountEntity {
  length: string;
  count: number;
  chapters_read: number;
  mean_score: number;
}
export interface FormatDistributionEntity {
  format: string;
  count: number;
  chapters_read: number;
  mean_score: number;
}
export interface StatusDistributionEntity {
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

export interface AllMangasEntity {
  id: number;
  title: string;
  image_url_id: string;
  title_en: string;
  title_ja: string;
}
