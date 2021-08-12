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

export default async function allAnimes(
  animeList: Array<any>
): Promise<Anime[]> {
  try {
    return _.map(
      animeList,
      _.partialRight(_.pick, [
        "id",
        "title",
        "image_url_id",
        "title_en",
        "title_ja",
      ])
    ) as Array<Anime>;
  } catch (err) {
    throw err;
  }
}
