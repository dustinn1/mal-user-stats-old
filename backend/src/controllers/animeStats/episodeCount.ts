import _ from 'lodash';

interface EpisodeCount {
  length: string,
  count: number,
  time_watched: number,
  mean_score: number
}

const lengths = [
  {min: 0, max: 0, length: "Unknown"},
  {min: 1, max: 1, length: "1"}, 
  {min: 2, max: 6, length: "2-6"}, 
  {min: 7, max: 16, length: "7-16"}, 
  {min: 17, max: 28, length: "17-28"}, 
  {min: 29, max: 55, length: "29-55"}, 
  {min: 56, max: 100, length: "56-100"}, 
  {min: 101, max: 10000, length: "101+"}
];

export default async function episodeCountStats(animeList: Array<any>): Promise<EpisodeCount[]> {
  let stats: Array<EpisodeCount> = [];
  try {
    for (let length of lengths) {
      let object: EpisodeCount = {
        length: length.length,
        count: 0,
        time_watched: 0,
        mean_score: 0
      };
      const animes = _.filter(animeList, function (n) {
        return n.num_episodes >= length.min && n.num_episodes <= length.max;
      });
      object.count = animes.length;
      object.time_watched = _.sumBy(animes, function(n) {
        return n.time_watched;
      });
      object.mean_score = _.round(_.meanBy(_.filter(animes, function(n) {
        return n.my_list_status.score;
      }), function(n) {
        return n.my_list_status.score;
      }), 2);
      stats.push(object);
    }
    return stats;
  } catch(err) {
    throw(err);
  }
}