import map from "lodash-es/map";
import partialRight from "lodash-es/partialRight";
import pick from "lodash-es/pick";

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
    return map(
      animeList,
      partialRight(pick, [
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
