import _ from "lodash";

interface VolumeCount {
  length: string;
  count: number;
  time_watched: number;
  mean_score: number;
}

const lengths = [
  { min: 0, max: 0, length: "Unknown" },
  { min: 1, max: 1, length: "1" },
  { min: 2, max: 6, length: "2-6" },
  { min: 7, max: 16, length: "7-16" },
  { min: 17, max: 28, length: "17-28" },
  { min: 29, max: 55, length: "29-55" },
  { min: 56, max: 100, length: "56-100" },
  { min: 101, max: 10000, length: "101+" },
];

export default async function volumeCountStats(
  mangaList: Array<any>
): Promise<VolumeCount[]> {
  let stats: Array<VolumeCount> = [];
  try {
    for (let length of lengths) {
      let object: VolumeCount = {
        length: length.length,
        count: 0,
        time_watched: 0,
        mean_score: 0,
      };
      const mangas = _.filter(mangaList, function (n) {
        return n.num_volumes >= length.min && n.num_volumes <= length.max;
      });
      object.count = mangas.length;
      object.time_watched = _.sumBy(mangas, function (n) {
        return n.time_watched;
      });
      const mean_score: number = _.round(
        _.meanBy(
          _.filter(mangas, function (n) {
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
