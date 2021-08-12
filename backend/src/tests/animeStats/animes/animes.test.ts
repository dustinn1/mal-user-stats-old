import allAnimes from "../../../controllers/stats/animeStats/animes";
import { animes } from "./data";

test("return an array of animes with certain information", async () => {
  const output = [
    {
      id: 37786,
      title: "Yagate Kimi ni Naru",
      image_url_id: "1783/96153",
      title_en: "Bloom Into You",
      title_ja: "やがて君になる",
    },
    {
      id: 6862,
      title: "K-On!: Live House!",
      image_url_id: "9/15892",
      title_en: "K-On!: Live House!",
      title_ja: "けいおん! ライブハウス!",
    },
    {
      id: 14811,
      title: "GJ-bu",
      image_url_id: "10/45995",
      title_en: "GJ Club",
      title_ja: "GJ部",
    },
    {
      id: 10521,
      title: "Working'!!",
      image_url_id: "3/75263",
      title_en: "Wagnaria!!2",
      title_ja: "ワーキング’！！",
    },
  ];
  const stats = await allAnimes(animes);
  expect(stats).toEqual(output);
});
