import filter from "lodash-es/filter";
import round from "lodash-es/round";
import meanBy from "lodash-es/meanBy";
import sumBy from "lodash-es/sumBy";

interface Status {
  status: string;
  count: number;
  chapters_read: number;
  mean_score: number;
}

const statuses = [
  {
    id: "reading",
    name: "Reading",
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
    id: "plan_to_read",
    name: "Plan To Read",
  },
];

export default async function statusStats(
  mangaList: Array<any>
): Promise<Status[]> {
  let stats: Array<Status> = [];
  try {
    for (let status of statuses) {
      let object: Status = {
        status: status.name,
        count: 0,
        chapters_read: 0,
        mean_score: 0,
      };
      const statusArray = filter(mangaList, {
        my_list_status: { status: status.id },
      });
      if (statusArray.length === 0) {
        continue;
      }
      object.count = statusArray.length;
      object.chapters_read = sumBy(statusArray, function (n) {
        return n.chapters_read;
      });
      const mean_score: number = round(
        meanBy(
          filter(statusArray, function (n) {
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
