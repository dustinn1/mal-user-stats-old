import axios from "axios";

const api_fields: { anime: string; manga: string } = {
  anime:
    "alternative_titles,start_date,end_date,mean,genres,media_type,status,my_list_status{num_times_rewatched},num_episodes,start_season,broadcast,source,average_episode_duration,studios",
  manga:
    "alternative_titles,start_date,end_date,mean,genres,media_type,my_list_status{num_times_reread},num_volumes,num_chapters",
};

async function getFullList(
  name: string,
  type: "anime" | "manga"
): Promise<Object[] | null> {
  let list: Object[] = [];
  let isEnd: boolean = false;
  let offset: number = 0;
  try {
    do {
      const response = await axios.get(
        `${
          process.env.NODE_ENV === "production" ? "api/" : ""
        }users/${name}/${type}list`,
        {
          params: {
            offset: offset * 1000,
            fields: api_fields[type],
            limit: 1000,
            nsfw: 1,
          },
          headers: {
            "X-MAL-CLIENT-ID": process.env.REACT_APP_MAL_CLIENT_ID!,
          },
        }
      );
      let data = response.data;
      for (let title of data.data) {
        list.push(title.node);
      }
      if (data.paging.next === undefined) {
        isEnd = true;
      } else {
        offset++;
      }
    } while (!isEnd);
    return list;
  } catch (err) {
    console.error(err);
  }
  return null;
}

export default async function fetch(
  name: string,
  type: "anime" | "manga"
): Promise<Object[] | null> {
  try {
    return await getFullList(name, type);
  } catch (error) {
    console.error(error);
  }
  return null;
}
