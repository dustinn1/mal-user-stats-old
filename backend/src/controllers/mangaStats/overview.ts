import _ from "lodash";

interface Overall {
  total_manga: number;
  chapters_read: number;
  volumes_read: number;
  mean_score: number;
  standard_deviation: number;
}

export default async function overallStats(
  mangaList: Array<any>
): Promise<Overall> {
  let object: Overall = {
    total_manga: 0,
    chapters_read: 0,
    volumes_read: 0,
    mean_score: 0,
    standard_deviation: 0,
  };
  try {
    object.total_manga = mangaList.length;
    object.chapters_read = _.sumBy(mangaList, function (n) {
      return n.my_list_status.num_chapters_read;
    });
    object.volumes_read = _.sumBy(mangaList, function (n) {
      return n.my_list_status.num_volumes_read;
    });
    const mangasWithScore = _.filter(mangaList, function (n) {
      return n.my_list_status.score;
    });
    object.mean_score = _.round(
      _.meanBy(mangasWithScore, function (n) {
        return n.my_list_status.score;
      }),
      2
    );
    object.standard_deviation = _.round(
      Math.sqrt(
        _.meanBy(mangasWithScore, function (n) {
          return Math.pow(n.my_list_status.score - object.mean_score, 2);
        })
      ),
      2
    );
    return object;
  } catch (err) {
    throw err;
  }
}
