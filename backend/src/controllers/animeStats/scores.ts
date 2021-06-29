import _ from 'lodash';

interface Score {
  score: number,
  count: number,
  time_watched: number,
}

export default async function scoreStats(animeList: Array<any>): Promise<Score[]> {
  let stats: Array<Score> = [];
  try {
    for (let i = 0; i <= 10; i++) {
      let object: Score = {
        score: i,
        count: 0,
        time_watched: 0
      };
      const scoreArray = _.filter(animeList, { my_list_status: { score: i } });
      if (scoreArray.length === 0) {
        continue;
      }
      object.count = scoreArray.length;
      object.time_watched = _.sumBy(scoreArray, function(n) {
        return n.time_watched;
      });
      stats.push(object);
    }
    return stats;
  } catch(err) {
    throw(err);
  }
}