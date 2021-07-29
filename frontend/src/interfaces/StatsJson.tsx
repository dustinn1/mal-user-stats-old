export default interface statsJSON {
  version: string;
  generated_on: Date;
  mal_id: number;
  username: string;
  statistics: {
    overview: {
      total_anime: number;
      episodes_watched: number;
      time_watched: number;
      mean_score: number;
      standard_deviation: number;
    };
    scores: Array<Object>;
    episode_count: Array<Object>;
    format_distribution: Array<Object>;
    status_distribution: Array<Object>;
    release_years: Array<Object>;
    watch_years: Array<Object>;
    genres: [
      {
        id: number;
        name: string;
        count: number;
        mean_score: number;
        time_watched: number;
        top_animes: Array<number>;
        all_animes: Array<number>;
      }
    ];
    studios: [
      {
        id: number;
        name: string;
        count: number;
        mean_score: number;
        time_watched: number;
        top_animes: Array<number>;
        all_animes: Array<number>;
      }
    ];
  };
  animes: Array<Object>;
}
