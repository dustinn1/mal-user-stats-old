import _ from "lodash";

interface Manga {
  id: number;
  title: string;
  image_url_id: number;
  alternative_titles: {
    en: string;
    jp: string;
  };
}

export default async function allMangas(
  mangaList: Array<any>
): Promise<Manga[]> {
  try {
    return _.map(
      mangaList,
      _.partialRight(_.pick, [
        "id",
        "title",
        "image_url_id",
        "title_en",
        "title_ja",
      ])
    ) as Array<Manga>;
  } catch (err) {
    throw err;
  }
}
