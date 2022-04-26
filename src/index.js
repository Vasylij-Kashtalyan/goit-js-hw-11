import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { lightbox } from './openLightbox';
import './css/styles.css';
import './sass/main.scss'


const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '26619525-aa9606919adbfa9adcea81a99'

const formEll = document.querySelector('.search-form');
const container = document.querySelector('.gallery');
formEll.addEventListener('submit', onSearchForm);
container.addEventListener('click', onClickCard);


function getImgView(searchQuery) {
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json()
    })
}
  
function onClickCard(evt) {
    lightbox.open(evt);
}

// function onFetchError(error) {
//   alert('Упс, что-то пошло не так и мы не нашли вашего покемона!');
// }

function onSearchForm(evt) {
  evt.preventDefault();
  evt.currentTarget.reset()
  const form = evt.target;
  const name = form.elements.query.value;
  

  getImgView(name).then(data => {
    container.innerHTML = creatCardGallery(data)
    
  })
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
    }).join('')
}

