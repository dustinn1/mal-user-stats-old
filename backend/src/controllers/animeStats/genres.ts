import _ from 'lodash';
import { genres } from '../../json/genres';

interface Genre {
  id: number,
  name: string,
  count: number,
  mean_score: number,
  time_watched: number,
  animes: Array<Object>
}

export default async function genreStats(animeList: Array<any>): Promise<Genre[]> {
  let stats: Array<Genre> = [];
  try {
    for (let genre of genres) {
      let object: Genre = {
        id: genre.id,
        name: genre.name,
        count: 0,
        mean_score: 0,
        time_watched: 0,
        animes: []
      };
      let animes = _.filter(animeList, { genres: [{ id: genre.id, name: genre.name }]});
      if (animes.length === 0) {
        continue;
      }
      object.count = animes.length;
      animes = _.filter(animes, function(n) {
        return n.mean;
      });
      object.mean_score = _.round(_.meanBy(_.filter(animes, function(n) {
        return n.my_list_status.score;
      }), function(n) {
        return n.my_list_status.score;
      }), 2);
      object.time_watched = _.sumBy(animes, function(n) {
        return n.time_watched;
      });
      animes = _.map(_.take(_.filter(_.orderBy(animes, 'mean', 'desc'), function(n) {
        return n.mean
      }), 10), _.partialRight(_.pick, ['id', 'title', 'image_url_id', 'alternative_titles.en', 'alternative_titles.ja']));
      object.animes = animes;
      stats.push(object);
    }
    stats = _.orderBy(stats, ['count', 'name'], ['desc', 'asc']);
    return stats;
  } catch(err) {
    throw(err);
  }
}