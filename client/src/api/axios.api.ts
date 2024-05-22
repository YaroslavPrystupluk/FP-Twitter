import axios from 'axios';
import { getTokenFromLocalStorage } from '../helpers/localStorage.helpers';

const instance = axios.create({
  baseURL: import.meta.env.BASE_URL || 'http://localhost:3001/api',
  headers: {
    Authorization: getTokenFromLocalStorage() || '',
  },
});

export { instance };
