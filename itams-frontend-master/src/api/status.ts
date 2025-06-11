import axios from './axios';

export const getAllStatuses = async () => {
  const data = await axios.get('/status/all');
  return data.data;
};
