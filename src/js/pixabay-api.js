import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38421129-385ad5ee77a37193a2d5ae11d';

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    },
  });
  return response.data;
}
