

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '26619525-aa9606919adbfa9adcea81a99'



fetch(`${BASE_URL}&key=${API_KEY}`).then(r => r.json()).then(console.log)