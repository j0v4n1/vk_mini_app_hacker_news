import axios from 'axios';

export const baseUrl = 'https://hacker-news.firebaseio.com/v0';
export const newsList = `${baseUrl}/newstories.json`;
export const newsItem = `${baseUrl}/item`;

export const getNewsList = async () => {
  try {
    const res = await axios.get(newsList).then(({ data }) => data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getNewsItem = async (newsItemId: number) => {
  try {
    const res = await axios.get(`${newsItem}/${newsItemId}.json`).then(({ data }) => data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getComment = async (commentId: number) => {
  try {
    const res = await axios.get(`${newsItem}/${commentId}.json`).then(({ data }) => {
      return data;
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
