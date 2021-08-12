import formatStats from "../../../controllers/stats/animeStats/format";
import { animes } from "./data";

test("return an array of anime stats sorted by format", async () => {
  const output = [
    {
      format: "TV",
      count: 4,
      time_watched: 53917,
      mean_score: 7.67,
    },
    {
      format: "OVA",
      count: 1,
      time_watched: 3240,
      mean_score: 0,
    },
    {
      format: "Movie",
      count: 2,
      time_watched: 6522,
      mean_score: 9,
    },
    {
      format: "Special",
      count: 2,
      time_watched: 7552,
      mean_score: 7,
    },
    {
      format: "ONA",
      count: 1,
      time_watched: 0,
      mean_score: 0,
    },
  ];
  const stats = await formatStats(animes);
  expect(stats).toEqual(output);
});
