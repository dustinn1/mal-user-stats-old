import _ from "lodash";

interface Genre {
  id: number;
  name: string;
  count: number;
  chapters_read: number;
  mean_score: number;
  top_mangas: Array<number>;
  all_mangas: Array<number>;
}

export default async function genreStats(
  mangaList: Array<any>
): Promise<Genre[]> {
  let stats: Array<Genre> = [];
  const genres = _.sortedUniqBy(
    _.sortBy(
      _.flatten(
        _.map(mangaList, function (n) {
          return _.map(n.genres, function (n) {
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
    for (let genre of genres) {
      let object: Genre = {
        id: genre.id,
        name: genre.name,
        count: 0,
        chapters_read: 0,
        mean_score: 0,
        top_mangas: [],
        all_mangas: [],
      };
      let mangas = _.filter(mangaList, {
        genres: [{ id: genre.id, name: genre.name }],
      });
      if (mangas.length === 0) {
        continue;
      }
      object.count = mangas.length;
      object.chapters_read = _.sumBy(mangas, function (n) {
        return n.chapters_read;
      });
      object.all_mangas = _.map(
        _.orderBy(mangas, "title", "asc"),
        function (n) {
          return n.id;
        }
      );
      mangas = _.filter(mangas, function (n) {
        return n.mean;
      });
      const mean_score: number = _.round(
        _.meanBy(
          _.filter(mangas, function (n) {
            return n.my_list_status.score;
          }),
          function (n) {
            return n.my_list_status.score;
          }
        ),
        2
      );
      if (!Number.isNaN(mean_score)) object.mean_score = mean_score;
      object.top_mangas = _.map(
        _.take(
          _.filter(_.orderBy(mangas, "mean", "desc"), function (n) {
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
