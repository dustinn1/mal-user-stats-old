import _ from "lodash";

interface ReadYear {
  year: number;
  count: number;
  chapters_read: number;
  mean_score: number;
}

export default async function watchYearStats(
  mangaList: Array<any>
): Promise<ReadYear[]> {
  let stats: Array<ReadYear> = [];
  const years = _.without(
    _.sortedUniq(
      _.sortBy(
        _.map(mangaList, function (n) {
          return n.my_list_status.start_date
            ? parseInt(n.my_list_status.start_date.split("-")[0])
            : 0;
        })
      )
    ),
    0
  );
  try {
    for (let year of years) {
      let object: ReadYear = {
        year: year,
        count: 0,
        chapters_read: 0,
        mean_score: 0,
      };
      const mangas = _.filter(mangaList, function (n) {
        return (
          n.my_list_status.start_date &&
          parseInt(n.my_list_status.start_date.split("-")[0]) === year
        );
      });
      object.count = mangas.length;
      object.chapters_read = _.sumBy(mangas, function (n) {
        return n.my_list_status.num_chapters_read;
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
      stats.push(object);
    }
    return stats;
  } catch (err) {
    throw err;
  }
}
