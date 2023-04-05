import axios from "axios";
import { BASE_URL } from "../config";

export const getHackerNewsData = async (id: number) => {
  const url = `${BASE_URL}/item/${id}.json?print=pretty`
  const { data } = await axios.get(url);
  return data;
}

export const getTopStoriesData = async () => {
  const topStoriesUrl = `${BASE_URL}/newstories.json?print=pretty`;
  const { data } = await axios.get(topStoriesUrl);
  return data;
}