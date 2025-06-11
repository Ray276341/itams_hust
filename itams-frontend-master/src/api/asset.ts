import { NewRequestAsset } from '../interface/interface';
import axios from './axios';

export const getAsset = async () => {
  const response = await axios.get('/asset/asset-to-user');
  return response.data;
};

export const getRequestAsset = async () => {
  const response = await axios.get('/asset/asset-requested');
  return response.data;
};

export const updateRequestAsset = async (
  id: number | string,
  requestAsset: NewRequestAsset,
) => {
  const response = await axios.put('/asset/update-request', {
    id: id,
    ...requestAsset,
  });
  return response.data;
};

export const createNewRequestAsset = async (requestAsset: NewRequestAsset) => {
  const response = await axios.post('/asset/new-request', requestAsset);
  return response.data;
};
