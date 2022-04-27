import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { lightbox } from './openLightbox';
import './css/styles.css';
import './sass/main.scss'


const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '26619525-aa9606919adbfa9adcea81a99'

const formEll = document.querySelector('.search-form');
const container = document.querySelector('.gallery');
const inputEll = document.querySelector('input')

formEll.addEventListener('submit', onSearchForm);
container.addEventListener('click', onClickGallaryCard);
inputEll.addEventListener('input', onInputCard)


async function getImgView(nameSearch) {
  const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${nameSearch}&image_type=photo&orientation=horizontal&safesearch=true`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

function onInputCard(evt){
  const searchInput = evt.currentTarget.value
}
function onClickGallaryCard(evt) {
  evt.preventDefault()
  
  if (!evt.currentTarget.classList.contains('card')) {
    return;
  }

  lightbox.open();
}



function onSearchForm(evt) {
  evt.preventDefault();
  const form = evt.target;
  const name = form.elements.query.value.trim()
  
  getImgView(name)
    .then(data => {
      

      container.innerHTML = creatCardGallery(data)
      lightbox.refresh()
    })
    .catch(onFetchError)
  
  evt.currentTarget.reset()
}

function creatCardGallery(data) {
  
  return data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads, }) => {
    return `
        <div class="photo-card">
          <a href="${largeImageURL}">
              <img class='card' src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
              <p class="info-item">
                <b>Likes:</b> ${likes}
              </p>
              <p class="info-item">
                <b>Views:</b> ${views}
              </p>
              <p class="info-item">
                <b>Comments:</b> ${comments}
              </p>
              <p class="info-item">
                <b>Downloads:</b> ${downloads}
              </p>
          </div>
        </div>`;
  }).join('');
}
function onFetchError(error) {
  alert('Упс, что-то пошло не так и мы не нашли вашего покемона!');
}
