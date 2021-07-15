import _ from 'lodash';

interface Score {
  score: number,
  count: number,
  time_watched: number,
  mean_score: number
}

export default async function scoreStats(animeList: Array<any>): Promise<Score[]> {
  let stats: Array<Score> = [];
  try {
    for (let i = 0; i <= 10; i++) {
      let object: Score = {
        score: i,
        count: 0,
        time_watched: 0,
        mean_score: 0
      };
      const scoreArray = _.filter(animeList, { my_list_status: { score: i } });
      if (scoreArray.length === 0) {
        continue;
      }
      object.count = scoreArray.length;
      object.time_watched = _.sumBy(scoreArray, function (n) {
        return n.time_watched;
      });
      const mean_score: number = _.round(_.meanBy(_.filter(scoreArray, function (n) {
        return n.my_list_status.score;
      }), function (n) {
        return n.my_list_status.score;
      }), 2);
      if (!Number.isNaN(mean_score)) object.mean_score = mean_score;
      stats.push(object);
    }
    return stats;
  } catch (err) {
    throw (err);
  }
}