import axios from './axios';

export const getAllDepartments = async () => {
  const data = await axios.get('/department/all');
  return data.data;
};
