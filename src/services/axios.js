import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `https://api.currencyapi.com/v3/`,
});
