import axios from 'axios';
import 'notiflix'; 
import { Report } from 'notiflix/build/notiflix-report-aio';
import SimpleLightbox from 'simplelightbox';

const apiKey = '38421129-385ad5ee77a37193a2d5ae11d'; 
const perPage = 40;
let currentPage = 1;

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}

function showEndOfResultsMessage() {
  Notiflix.Report.info("Info", "We're sorry, but you've reached the end of search results.", "OK");
}

async function handleSearch(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const searchQuery = formData.get('searchQuery');

  if (!searchQuery) {
    return;
  }

  try {
    currentPage = 1;
    gallery.innerHTML = '';
    const images = await fetchImages(searchQuery);
    if (images.totalHits === 0) {
      Notiflix.Report.failure("Oops!", "Sorry, there are no images matching your search query. Please try again.", "OK");
      hideLoadMoreButton(); 
    } else {
      displayImages(images.hits);
      if (images.totalHits <= perPage) {
        hideLoadMoreButton(); 
      } else {
        showLoadMoreButton(); 
      }
    }
  } catch (error) {
    Notiflix.Report.failure("Error", error.message, "OK");
    hideLoadMoreButton();
  }
}

async function handleLoadMore() {
  try {
    currentPage++;
    const searchQuery = document.querySelector('input[name="searchQuery"]').value;
    const images = await fetchImages(searchQuery);
    displayImages(images.hits);
    if (images.totalHits <= currentPage * perPage) {
      hideLoadMoreButton(); 
      showEndOfResultsMessage(); 
    }
  } catch (error) {
    Notiflix.Report.failure("Error", error.message, "OK");
    hideLoadMoreButton(); 
  }
}

async function fetchImages(query) {
  try {
    const encodedQuery = encodeURIComponent(query); 
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q: encodedQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: currentPage
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images.');
  }
}

function displayImages(images) {
  images.forEach((image) => {
    const card = document.createElement('div');
    card.classList.add('photo-card');
    card.innerHTML = `
      <a href="${image.largeImageURL}" class="gallery__item"> <!-- Змінено обгортку на посилання для SimpleLightbox -->
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    `;
    gallery.appendChild(card);
  });


  lightbox.refresh();
}

async function handleSearch(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const searchQuery = formData.get('searchQuery');

  if (!searchQuery) {
    return;
  }

  try {
    currentPage = 1;
    gallery.innerHTML = '';
    const images = await fetchImages(searchQuery);
    if (images.totalHits === 0) {
      Report.failure("Oops!", "Sorry, there are no images matching your search query. Please try again.", "OK"); 
    } else {
      loadMoreBtn.style.display = 'block';
      displayImages(images.hits);
    }
  } catch (error) {
    Report.failure("Error", error.message, "OK"); 
  }
}

async function handleLoadMore() {
  try {
    currentPage++;
    const searchQuery = document.querySelector('input[name="searchQuery"]').value;
    const images = await fetchImages(searchQuery);
    displayImages(images.hits);
    if (images.totalHits <= currentPage * perPage) {
      loadMoreBtn.style.display = 'none';
      Report.info("Info", "You've reached the end of search results.", "OK"); 
    }
  } catch (error) {
    Report.failure("Error", error.message, "OK");
  }
}

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

const lightbox = new SimpleLightbox('.gallery__item');