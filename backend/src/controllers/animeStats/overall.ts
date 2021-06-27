import _ from 'lodash';

interface Overall {
  total_anime: number,
  episodes_watched: number,
  time_watched: number,
  mean_score: number
}

export default async function overallStats(animeList: Array<any>): Promise<Overall> {
  let object: Overall = {
    total_anime: 0,
    episodes_watched: 0,
    time_watched: 0,
    mean_score: 0
  };
  try {
    object.total_anime = animeList.length;
    object.episodes_watched = _.sumBy(animeList, function(n) {
      return n.my_list_status.num_episodes_watched;
    });
    object.time_watched = _.sumBy(animeList, function(n) {
      return n.time_watched;
    })
    object.mean_score = _.round(_.meanBy(_.filter(animeList, function(n) {
      return n.mean;
    }), function(n) {
      return n.mean;
    }), 2);
    return object;
  } catch(err) {
    throw(err);
  }
}