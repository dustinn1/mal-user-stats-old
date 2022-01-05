import sumBy from "lodash-es/sumBy";
import filter from "lodash-es/filter";
import round from "lodash-es/round";
import meanBy from "lodash-es/meanBy";

interface Overall {
  total_anime: number;
  episodes_watched: number;
  time_watched: number;
  mean_score: number;
  standard_deviation: number;
}

export default async function overallStats(
  animeList: Array<any>
): Promise<Overall> {
  let object: Overall = {
    total_anime: 0,
    episodes_watched: 0,
    time_watched: 0,
    mean_score: 0,
    standard_deviation: 0,
  };
  try {
    object.total_anime = animeList.length;
    object.episodes_watched = sumBy(animeList, function (n) {
      return n.my_list_status.num_episodes_watched;
    });
    object.time_watched = sumBy(animeList, function (n) {
      return n.time_watched;
    });
    const animesWithScore = filter(animeList, function (n) {
      return n.my_list_status.score;
    });
    object.mean_score = round(
      meanBy(animesWithScore, function (n) {
        return n.my_list_status.score;
      }),
      2
    );
    object.standard_deviation = round(
      Math.sqrt(
        meanBy(animesWithScore, function (n) {
          return Math.pow(n.my_list_status.score - object.mean_score, 2);
        })
      ),
      2
    );
    return object;
  } catch (err) {
    throw err;
  }
}
