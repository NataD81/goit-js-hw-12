import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const pixUrl = 'https://pixabay.com/api/';
const apiKey = '44048245-ca045a99f6e49609e4580f957';
const perPage = 15;

export async function findImg(query, page) {
  const params = {
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage
  };

  const response = await axios.get(pixUrl, { params });
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
}