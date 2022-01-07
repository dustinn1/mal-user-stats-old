import sumBy from "lodash-es/sumBy";
import filter from "lodash-es/filter";
import round from "lodash-es/round";
import meanBy from "lodash-es/meanBy";

interface Overview {
  total_manga: number;
  chapters_read: number;
  volumes_read: number;
  mean_score: number;
  standard_deviation: number;
}

export default async function overviewStats(
  mangaList: Array<any>
): Promise<Overview> {
  let object: Overview = {
    total_manga: 0,
    chapters_read: 0,
    volumes_read: 0,
    mean_score: 0,
    standard_deviation: 0,
  };
  try {
    object.total_manga = mangaList.length;
    object.chapters_read = sumBy(mangaList, function (n) {
      return n.chapters_read;
    });
    object.volumes_read = sumBy(mangaList, function (n) {
      return n.my_list_status.num_volumes_read;
    });
    const mangasWithScore = filter(mangaList, function (n) {
      return n.my_list_status.score;
    });
    object.mean_score = round(
      meanBy(mangasWithScore, function (n) {
        return n.my_list_status.score;
      }),
      2
    );
    object.standard_deviation = round(
      Math.sqrt(
        meanBy(mangasWithScore, function (n) {
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
