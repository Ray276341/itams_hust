import axios from './axios';
import { ServiceUpdate, NewServiceUpdate } from '../interface/interface';

export const getAllServiceUpdates = async (): Promise<ServiceUpdate[]> => {
  const { data } = await axios.get('/service-updates');
  return data;
};

export const getServiceUpdateById = async (
  id: number | string,
): Promise<ServiceUpdate> => {
  const { data } = await axios.get(`/service-updates/${id}`);
  return data;
};

export const getServiceUpdatesByServiceId = async (
  serviceId: number | string,
): Promise<ServiceUpdate[]> => {
  const { data } = await axios.get(
    `/service-updates/service/${serviceId}`,
  );
  return data;
};

export const createNewServiceUpdate = async (
  update: NewServiceUpdate,
): Promise<ServiceUpdate> => {
  const { data } = await axios.post(
    '/service-updates',
    update,
  );
  return data;
};

export const updateServiceUpdate = async (
  id: number | string,
  update: NewServiceUpdate,
): Promise<ServiceUpdate> => {
  const { data } = await axios.patch(
    `/service-updates/${id}`,
    update,
  );
  return data;
};

export const deleteServiceUpdate = async (
  id: number | string,
): Promise<{ deleted: true }> => {
  const { data } = await axios.delete(
    `/service-updates/${id}`,
  );
  return data;
};
