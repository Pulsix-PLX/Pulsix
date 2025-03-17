import axios from 'axios';

// Dichiarazione dell'istanza configurata
export const api = axios.create({
  baseURL: 'https://localhost/',
  timeout: 2000,   //tempo che aspetta prima di abortire la richiesta
  headers: {}
});