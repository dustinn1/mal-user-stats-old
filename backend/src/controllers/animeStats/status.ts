import _ from 'lodash';

interface Status {
  status: string,
  count: number,
  time_watched: number,
  mean_score: number
}

const statuses = ['watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch'];

export default async function statusStats(animeList: Array<any>): Promise<Status[]> {
  let stats: Array<Status> = [];
  try {
    for (let status of statuses) {
      let object: Status = {
        status: status,
        count: 0,
        time_watched: 0,
        mean_score: 0
      };
      const statusArray = _.filter(animeList, { my_list_status: { status: status } });
      if (statusArray.length === 0) {
        continue;
      }
      object.count = statusArray.length;
      object.time_watched = _.sumBy(statusArray, function(n) {
        return n.time_watched;
      });
      object.mean_score = _.round(_.meanBy(_.filter(statusArray, function(n) {
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