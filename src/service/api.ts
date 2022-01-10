import axios from 'axios';

const reactEnv = process.env.REACT_APP_ENV;
const baseURL = reactEnv === 'development' ? process.env.REACT_APP_API_DEV : process.env.REACT_APP_API_PROD;

export const apiReturnFile = baseURL;

const api = axios.create({ baseURL });

export default api;