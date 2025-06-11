import axios from './axios';

export const getAllCategories = async () => {
  const data = await axios.get('/category/all');
  return data.data;
};
