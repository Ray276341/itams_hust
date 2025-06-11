import { NewServiceType } from '../interface/interface';
import axios from './axios';

export const getAllServiceTypes = async () => {
  const data = await axios.get('/service-type/all');
  return data.data;
};

export const getServiceTypeById = async (id: number | string) => {
  const response = await axios.get(`/service-type/get-service-type-by-id/${id}`);
  return response.data;
};

export const updateServiceType = async (
  id: number | string,
  serviceType: NewServiceType,
) => {
  const response = await axios.put('/service-type/update-service-type', {
    id: id,
    ...serviceType,
  });
  return response.data;
};

export const deleteServiceType = async (id: number | string) => {
  const response = await axios.delete('/service-type/delete-service-type', {
    data: { id },
  });
  return response.data;
};

export const createNewServiceType = async (serviceType: NewServiceType) => {
  const response = await axios.post('/service-type/create-service-type', serviceType);
  return response.data;
};
