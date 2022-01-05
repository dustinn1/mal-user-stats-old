import filter from "lodash-es/filter";
import round from "lodash-es/round";
import meanBy from "lodash-es/meanBy";
import sumBy from "lodash-es/sumBy";

interface Format {
  format: string;
  count: number;
  chapters_read: number;
  mean_score: number;
}

const formats = [
  {
    id: "manga",
    name: "Manga",
  },
  {
    id: "light_novel",
    name: "Light Novel",
  },
  {
    id: "novel",
    name: "Novel",
  },
  {
    id: "one_shot",
    name: "One Shot",
  },
  {
    id: "doujinshi",
    name: "Doujinshi",
  },
  {
    id: "manhwa",
    name: "Manhwa",
  },
  {
    id: "manhua",
    name: "Manhua",
  },
];

export default async function formatStats(
  mangaList: Array<any>
): Promise<Format[]> {
  let stats: Array<Format> = [];
  try {
    for (let format of formats) {
      let object: Format = {
        format: format.name,
        count: 0,
        chapters_read: 0,
        mean_score: 0,
      };
      const formatArray = filter(mangaList, { media_type: format.id });
      if (formatArray.length === 0) {
        continue;
      }
      object.count = formatArray.length;
      object.chapters_read = sumBy(formatArray, function (n) {
        return n.chapters_read;
      });
      const mean_score: number = round(
        meanBy(
          filter(formatArray, function (n) {
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
