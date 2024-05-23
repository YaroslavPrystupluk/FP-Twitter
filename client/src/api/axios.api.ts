import axios from 'axios';
import { getTokenFromLocalStorage } from '../helpers/localStorage.helpers';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ||'http://localhost:3001/api',
  headers: {
    Authorization: getTokenFromLocalStorage() || '',
  },
});

