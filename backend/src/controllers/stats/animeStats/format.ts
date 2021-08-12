import _ from "lodash";

interface Format {
  format: string;
  count: number;
  time_watched: number;
  mean_score: number;
}

const formats = [
  {
    id: "tv",
    name: "TV",
  },
  {
    id: "ova",
    name: "OVA",
  },
  {
    id: "movie",
    name: "Movie",
  },
  {
    id: "special",
    name: "Special",
  },
  {
    id: "ona",
    name: "ONA",
  },
  {
    id: "music",
    name: "Music",
  },
];

export default async function formatStats(
  animeList: Array<any>
): Promise<Format[]> {
  let stats: Array<Format> = [];
  try {
    for (let format of formats) {
      let object: Format = {
        format: format.name,
        count: 0,
        time_watched: 0,
        mean_score: 0,
      };
      const formatArray = _.filter(animeList, { media_type: format.id });
      if (formatArray.length === 0) {
        continue;
      }
      object.count = formatArray.length;
      object.time_watched = _.sumBy(formatArray, function (n) {
        return n.time_watched;
      });
      const mean_score: number = _.round(
        _.meanBy(
          _.filter(formatArray, function (n) {
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
