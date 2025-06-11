import { NewRequestService } from '../interface/interface';
import axios from './axios';

export const getService = async () => {
  const response = await axios.get('/service/service-to-user-by-user');
  return response.data;
};

export const getRequestService = async () => {
  const response = await axios.get('/service/service-requested');
  return response.data;
};

export const updateRequestService = async (
  id: number | string,
  requestService: NewRequestService,
) => {
  const response = await axios.put('/service/update-request', {
    id: id,
    ...requestService,
  });
  return response.data;
};

export const createNewRequestService = async (requestService: NewRequestService) => {
  const response = await axios.post('/service/new-request', requestService);
  return response.data;
};
