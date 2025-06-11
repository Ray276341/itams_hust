import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use((config: any) => {
  const access_token = window.localStorage.getItem('access-token-admin');
  if (access_token) config.headers['Authorization'] = 'Bearer ' + access_token;
  return config;
});

export default instance;
