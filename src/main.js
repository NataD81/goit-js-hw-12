import { findImg } from './js/pixabay-api';
import {
  downLoadImg,
  imgGallery,
  showLoading,
  hideLoading,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  showError,
  showEndOfResults
} from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';


const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector("#loading");
const loadMoreBtn = document.querySelector("#load-more");

let query = '';
let page = 1;
let totalHits = 0;


hideLoadMoreBtn(loadMoreBtn);

form.addEventListener('submit', async event => {
  event.preventDefault();
  gallery.innerHTML = '';
  query = event.target.request.value.trim();
  page = 1;

  if (!query) return;

  showLoading(loader);
  hideLoadMoreBtn(loadMoreBtn);

  try {
    const data = await findImg(query, page);
    totalHits = data.totalHits; 
    handleImages(data);
  } catch (error) {
    showError(error.message);
  } finally {
    form.reset();
    hideLoading(loader);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  showLoading(loader);
  page += 1;

  try {
    const data = await findImg(query, page);
    handleImages(data);
  } catch (error) {
    showError(error);
  } finally {
    hideLoading(loader);
  }
});

function handleImages(data) {
  if (data.hits.length === 0) {
    iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  const markup = downLoadImg(data.hits);
  gallery.insertAdjacentHTML('beforeend', markup);
  imgGallery();


  const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

  
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  if (gallery.children.length < totalHits) {
    showLoadMoreBtn(loadMoreBtn);
  } else {
    hideLoadMoreBtn(loadMoreBtn);
    showEndOfResults();
  }
}