import sortedUniqBy from "lodash-es/sortedUniqBy";
import sortBy from "lodash-es/sortBy";
import flatten from "lodash-es/flatten";
import map from "lodash-es/map";
import filter from "lodash-es/filter";
import orderBy from "lodash-es/orderBy";
import round from "lodash-es/round";
import meanBy from "lodash-es/meanBy";
import sumBy from "lodash-es/sumBy";
import take from "lodash-es/take";

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
  const studios = sortedUniqBy(
    sortBy(
      flatten(
        map(animeList, function (n) {
          return map(n.studios, function (n) {
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
      let animes = filter(animeList, {
        studios: [{ id: studio.id, name: studio.name }],
      });
      if (animes.length === 0) {
        continue;
      }
      object.count = animes.length;
      object.all_animes = map(orderBy(animes, "title", "asc"), function (n) {
        return n.id;
      });
      animes = filter(animes, function (n) {
        return n.mean;
      });
      const mean_score: number = round(
        meanBy(
          filter(animes, function (n) {
            return n.my_list_status.score;
          }),
          function (n) {
            return n.my_list_status.score;
          }
        ),
        2
      );
      if (!Number.isNaN(mean_score)) object.mean_score = mean_score;
      object.time_watched = sumBy(animes, function (n) {
        return n.time_watched;
      });
      object.top_animes = map(
        take(
          filter(orderBy(animes, "mean", "desc"), function (n) {
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
    stats = orderBy(stats, ["count", "name"], ["desc", "asc"]);
    return stats;
  } catch (err) {
    throw err;
  }
}
