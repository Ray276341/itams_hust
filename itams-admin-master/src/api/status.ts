import { NewStatus } from '../interface/interface';
import axios from './axios';

export const getAllStatuses = async () => {
  const data = await axios.get('/status/all');
  return data.data;
};

export const getStatusById = async (id: number | string) => {
  const response = await axios.get(`/status/get-status-by-id/${id}`);
  return response.data;
};

export const updateStatus = async (id: number | string, status: NewStatus) => {
  const response = await axios.put('/status/update-status', {
    id: id,
    ...status,
  });
  return response.data;
};

export const deleteStatus = async (id: number | string) => {
  const response = await axios.delete('/status/delete-status', {
    data: { id },
  });
  return response.data;
};

export const createNewStatus = async (status: NewStatus) => {
  const response = await axios.post('/status/create-status', status);
  return response.data;
};
