import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/', // Esempio
  // Importante per inviare/ricevere cookies (necessario per il refresh token)
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});