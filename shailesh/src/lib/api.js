import axios from './axios';

export const api = {
  get: (url, config) => axios.get(url, config),
  post: (url, data) => axios.post(url, data),
  put: (url, data) => axios.put(url, data),
  delete: (url) => axios.delete(url),
};