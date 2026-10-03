import axios from 'axios';
import { API_BASE_URL } from './environment';

export const API_URL = API_BASE_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});