import statusStats from "../../../controllers/stats/animeStats/status";
import { animes } from "./data";

test("return an array of anime stats sorted by status", async () => {
  const output = [
    {
      status: "Watching",
      count: 2,
      time_watched: 2844,
      mean_score: 0,
    },
    {
      status: "Completed",
      count: 4,
      time_watched: 76610,
      mean_score: 8.75,
    },
    {
      status: "On Hold",
      count: 2,
      time_watched: 28010,
      mean_score: 0,
    },
    {
      status: "Dropped",
      count: 1,
      time_watched: 2920,
      mean_score: 0,
    },
    {
      status: "Plan To Watch",
      count: 2,
      time_watched: 0,
      mean_score: 0,
    },
  ];
  const stats = await statusStats(animes);
  expect(stats).toEqual(output);
});
