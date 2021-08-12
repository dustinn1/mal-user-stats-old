import _ from "lodash";

interface ReleaseYear {
  year: number;
  count: number;
  time_watched: number;
  mean_score: number;
}

export default async function releaseYearStats(
  animeList: Array<any>
): Promise<ReleaseYear[]> {
  let stats: Array<ReleaseYear> = [];
  const years = _.sortedUniq(
    _.sortBy(
      _.map(animeList, function (n) {
        return n.start_season
          ? n.start_season.year
          : parseInt(n.start_date.split("-")[0]);
      })
    )
  );
  try {
    for (let year of years) {
      let object: ReleaseYear = {
        year: year,
        count: 0,
        time_watched: 0,
        mean_score: 0,
      };
      const animes = _.filter(animeList, function (n) {
        return (
          (n.start_season && n.start_season.year === year) ||
          (n.start_date && parseInt(n.start_date.split("-")[0]) === year)
        );
      });
      object.count = animes.length;
      object.time_watched = _.sumBy(animes, function (n) {
        return n.time_watched;
      });
      const mean_score: number = _.round(
        _.meanBy(
          _.filter(animes, function (n) {
            return n.my_list_status.score;
          }),
          function (n) {
            return n.my_list_status.score;
          }
        ),
        2
      );
      if (!Number.isNaN(mean_score)) object.mean_score = mean_score;
      stats.push(object);
    }
    return stats;
  } catch (err) {
    throw err;
  }
}
