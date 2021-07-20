import _ from "lodash";

interface Anime {
  id: number;
  title: string;
  image_url_id: number;
  alternative_titles: {
    en: string;
    jp: string;
  };
}

export default async function genreStats(
  animeList: Array<any>
): Promise<Anime[]> {
  try {
    return _.map(
      animeList,
      _.partialRight(_.pick, [
        "id",
        "title",
        "image_url_id",
        "alternative_titles.en",
        "alternative_titles.ja",
      ])
    ) as Array<Anime>;
  } catch (err) {
    throw err;
  }
}
