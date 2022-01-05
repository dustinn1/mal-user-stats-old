import filter from "lodash-es/filter";
import round from "lodash-es/round";
import meanBy from "lodash-es/meanBy";
import sumBy from "lodash-es/sumBy";

interface Score {
  score: number;
  count: number;
  chapters_read: number;
  mean_score: number;
}

export default async function scoreStats(
  mangaList: Array<any>
): Promise<Score[]> {
  let stats: Array<Score> = [];
  try {
    for (let i = 0; i <= 10; i++) {
      let object: Score = {
        score: i,
        count: 0,
        chapters_read: 0,
        mean_score: 0,
      };
      const scoreArray = filter(mangaList, { my_list_status: { score: i } });
      if (scoreArray.length === 0) {
        continue;
      }
      object.count = scoreArray.length;
      object.chapters_read = sumBy(scoreArray, function (n) {
        return n.chapters_read;
      });
      const mean_score: number = round(
        meanBy(
          filter(scoreArray, function (n) {
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
