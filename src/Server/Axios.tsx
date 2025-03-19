import axios from 'axios';

// Dichiarazione dell'istanza configurata
export const api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,   //tempo che aspetta prima di abortire la richiesta
  headers: {}
});