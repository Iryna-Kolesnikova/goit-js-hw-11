import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38421129-385ad5ee77a37193a2d5ae11d';

export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
}
