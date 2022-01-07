import map from "lodash-es/map";
import partialRight from "lodash-es/partialRight";
import pick from "lodash-es/pick";

interface Manga {
  id: number;
  title: string;
  image_url_id: string;
  title_en: string;
  title_ja: string;
}

export default async function allMangas(
  mangaList: Array<any>
): Promise<Manga[]> {
  try {
    return map(
      mangaList,
      partialRight(pick, [
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
