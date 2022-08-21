import './css/styles.css';
import './sass/main.scss';
import { cleanRender } from './partials/js/cleanRender';
import { refs } from './partials/js/refs';
import { smoothScroll } from './partials/js/smoothScroll';
import { creatCardGallery } from './partials/js/creatCardGallery';
import { Notify } from 'notiflix';
import NewPixabayAPI from './partials/js/api/apiServise';

const pixabayAPI = new NewPixabayAPI();

refs.formRef.addEventListener('submit', onInputSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onInputSearch(evt) {
  evt.preventDefault();
  pixabayAPI.query = evt.currentTarget.elements.searchQuery.value.trim();
  pixabayAPI.resetPage();

  if (pixabayAPI.query === '') return;

  cleanRender();
  if (cleanRender) refs.btnLoadMore.style.display = 'none';

  pixabayAPI.getImgView(pixabayAPI.query).then(pictures => {
    if (pictures.hits.length < 1) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else if (pictures.hits.length >= 1) {
      Notify.success(`Hooray! We found ${pictures.totalHits} images.`);

      refs.containerEll.classList.remove('container__imgbackground');
      refs.btnLoadMore.style.display = 'block';
    }

    if (pictures.hits.lenght < 40) refs.btnLoadMore.style.display = 'none';

    creatCardGallery(pictures);
  });
}

async function onLoadMore() {
  try {
    await pixabayAPI.getImgView(pixabayAPI.query).then(pictures => {
      creatCardGallery(pictures);
      if (pictures.hits.lenght < 40) {
        setTimeout(() => {
          Notify.info("We're sorry, but you've reached the end of search results");
        }, 1000);
        refs.btnLoadMore.style.display = 'none';
      }
      smoothScroll();
    });
  } catch (error) {}
}

// function onInputCard(evt) {
//   const searchInput = evt.currentTarget.value;
// }
// function onClickGallaryCard(evt) {
//   evt.preventDefault();

//   if (!evt.currentTarget.classList.contains('card')) {
//     return;
//   }

//   lightbox.open();
// }

// function onSearchForm(evt) {
//   evt.preventDefault();
//   const form = evt.target;

//   pixabayAPI.query = form.elements.searchQuery.value.trim();

//   if (!pixabayAPI.query) return;

//   pixabayAPI
//     .getImgView(pixabayAPI.query)
//     .then(data => {
//       container.innerHTML = creatCardGallery(data);
//       lightbox.refresh();
//     })
//     .catch(onFetchError);

//   evt.currentTarget.reset();
// }

// function onFetchError(error) {
//   alert('Упс, что-то пошло не так и мы не нашли вашего покемона!');
// }
