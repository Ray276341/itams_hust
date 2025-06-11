import { NewDeprecation } from '../interface/interface';
import axios from './axios';

export const getAllDeprecations = async () => {
  const data = await axios.get('/deprecation/all');
  return data.data;
};

export const getDeprecationById = async (id: number | string) => {
  const response = await axios.get('/deprecation/get-deprecation-by-id', {
    data: { id },
  });
  return response.data;
};

export const updateDeprecation = async (
  id: number | string,
  deprecation: NewDeprecation,
) => {
  const response = await axios.put('/deprecation/update-deprecation', {
    id: id,
    ...deprecation,
  });
  return response.data;
};

export const deleteDeprecation = async (id: number | string) => {
  const response = await axios.delete('/deprecation/delete-deprecation', {
    data: { id },
  });
  return response.data;
};

export const createNewDeprecation = async (deprecation: NewDeprecation) => {
  const response = await axios.post(
    '/deprecation/create-deprecation',
    deprecation,
  );
  return response.data;
};
