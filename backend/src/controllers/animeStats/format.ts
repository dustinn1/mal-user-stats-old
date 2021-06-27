import _ from 'lodash';

interface Format {
  format: string,
  count: number,
  time_watched: number,
  mean_score: number
}

const formats = ['tv', 'ova', 'movie', 'special', 'ona', 'music'];

export default async function formatStats(animeList: Array<any>): Promise<Format[]> {
  let stats: Array<Format> = [];
  try {
    for (let format of formats) {
      let object: Format = {
        format: format,
        count: 0,
        time_watched: 0,
        mean_score: 0
      };
      const formatArray = _.filter(animeList, { media_type: format });
      if (formatArray.length === 0) {
        continue;
      }
      object.count = formatArray.length;
      object.time_watched = _.sumBy(formatArray, function(n) {
        return n.time_watched;
      });
      object.mean_score = _.round(_.meanBy(_.filter(formatArray, function(n) {
        return n.mean;
      }), function(n) {
        return n.mean;
      }), 2);
      stats.push(object);
    }
    return stats;
  } catch(err) {
    throw(err);
  }
}