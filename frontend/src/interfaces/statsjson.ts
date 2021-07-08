export default interface statsJSON {
  mal_id: number,
  username: string,
  statistics: {
    overview: Object,
    scores: Array<Object>,
    episode_count: Array<Object>,
    format_distribution: Array<Object>,
    status_distribution: Array<Object>,
    release_years: Array<Object>,
    watch_years: Array<Object>,
    genres: [
      {
        id: number,
        name: string,
        count: number,
        mean_score: number,
        time_watched: number,
        animes: Array<Object>
      }
    ]
  }
}