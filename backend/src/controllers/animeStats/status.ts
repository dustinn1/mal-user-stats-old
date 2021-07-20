import _, { mean } from "lodash";

interface Status {
  status: string;
  count: number;
  time_watched: number;
  mean_score: number;
}

const statuses = [
  {
    id: "watching",
    name: "Watching",
  },
  {
    id: "completed",
    name: "Completed",
  },
  {
    id: "on_hold",
    name: "On Hold",
  },
  {
    id: "dropped",
    name: "Dropped",
  },
  {
    id: "plan_to_watch",
    name: "Plan To Watch",
  },
];

export default async function statusStats(
  animeList: Array<any>
): Promise<Status[]> {
  let stats: Array<Status> = [];
  try {
    for (let status of statuses) {
      let object: Status = {
        status: status.name,
        count: 0,
        time_watched: 0,
        mean_score: 0,
      };
      const statusArray = _.filter(animeList, {
        my_list_status: { status: status.id },
      });
      if (statusArray.length === 0) {
        continue;
      }
      object.count = statusArray.length;
      object.time_watched = _.sumBy(statusArray, function (n) {
        return n.time_watched;
      });
      const mean_score: number = _.round(
        _.meanBy(
          _.filter(statusArray, function (n) {
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
