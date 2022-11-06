import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '0214e4f6556edfc65f2eadfc23b43510';

export const fetchMovies = page => {
  return axios('trending/movie/day', {
    params: {
      api_key: API_KEY,
      page,
    },
  });
};
