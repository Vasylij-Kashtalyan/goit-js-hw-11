const BASE_URL = 'https://pixabay.com/api/';

const options = {

    key: '26619525-aa9606919adbfa9adcea81a99',
    query: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch :'true',
    
}
export function fetchApi() {
    fetch(`${BASE_URL}, ${options}`).then(resolve => resolve.json).catch(Error);
}


console.log(fetchApi)