import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '26619525-aa9606919adbfa9adcea81a99';

export default class NewPixabayAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async getImgView() {
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`,
      );

      this.incrementPage();
      return response.data;
    } catch (error) {}
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// import axios from 'axios';
// const API_KEY = '25715337-58cde3c0d1b1902de73779f35';
// const BASE_URL = 'https://pixabay.com/api';

// export default class NewPixabayAPI {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   async axiosPicture() {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`,
//       );
//       this.incrementPage();
//       return response.data;
//     } catch (error) {}
//   }

//   incrementPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }
//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }
