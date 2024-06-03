import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';

let lightbox;

export function createImg(image) {
  return `<li class="card">
    <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}">
    </a>
    <div class="card-info">
        <p class="description"><b>Likes:</b> ${image.likes}</p>
        <p class="description"><b>Views:</b> ${image.views}</p>
        <p class="description"><b>Comments:</b> ${image.comments}</p>
        <p class="description"><b>Downloads:</b> ${image.downloads}</p>
    </div>
  </li>`;
}

export function downLoadImg(arr) {
  return arr.map(createImg).join('');
}

export function imgGallery() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function showLoading(loader) {
  loader.style.display = 'block';
//   iziToast.info({
//     message: 'Loading images, please wait...',
//     position: 'bottomCenter',
//     timeout: 1000,
//   });
}

export function hideLoading(loader) {
  loader.style.display = 'none';
}

export function showLoadMoreBtn(button) {
  button.style.display = 'block';
}

export function hideLoadMoreBtn(button) {
  button.style.display = 'none';
}

export function showError(error) {
  iziToast.error({
    message: `An error occurred: ${error}. Please try again later.`,
    position: 'topRight',
  });
}

export function showEndOfResults() {
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
  });
}
