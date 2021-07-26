import _ from "lodash";

interface Studio {
  id: number;
  name: string;
  count: number;
  mean_score: number;
  time_watched: number;
  top_animes: Array<number>;
  all_animes: Array<number>;
}

export default async function genreStats(
  animeList: Array<any>
): Promise<any[]> {
  let stats: Array<Studio> = [];
  const studios = _.sortedUniqBy(
    _.sortBy(
      _.flatten(
        _.map(animeList, function (n) {
          return _.map(n.studios, function (n) {
            return {
              id: n.id,
              name: n.name,
            };
          });
        })
      ),
      function (n) {
        return n.id;
      }
    ),
    function (n) {
      return n.id;
    }
  );
  try {
    for (let studio of studios) {
      let object: Studio = {
        id: studio.id,
        name: studio.name,
        count: 0,
        mean_score: 0,
        time_watched: 0,
        top_animes: [],
        all_animes: [],
      };
      let animes = _.filter(animeList, {
        studios: [{ id: studio.id, name: studio.name }],
      });
      if (animes.length === 0) {
        continue;
      }
      object.count = animes.length;
      object.all_animes = _.map(
        _.orderBy(animes, "title", "asc"),
        function (n) {
          return n.id;
        }
      );
      animes = _.filter(animes, function (n) {
        return n.mean;
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
      object.time_watched = _.sumBy(animes, function (n) {
        return n.time_watched;
      });
      object.top_animes = _.map(
        _.take(
          _.filter(_.orderBy(animes, "mean", "desc"), function (n) {
            return n.mean;
          }),
          10
        ),
        function (n) {
          return n.id;
        }
      );
      stats.push(object);
    }
    stats = _.orderBy(stats, ["count", "name"], ["desc", "asc"]);
    return stats;
  } catch (err) {
    throw err;
  }
}
