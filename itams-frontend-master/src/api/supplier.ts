import axios from './axios';

export const getAllSuppliers = async () => {
  const data = await axios.get('/supplier/all');
  return data.data;
};
