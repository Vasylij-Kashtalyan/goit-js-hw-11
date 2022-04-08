import './css/styles.css';
import axios from "axios";
import { fetchApi } from './js/fetchApi';


const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const button = document.querySelector('button');

fetchApi()