import axios from './axios';
import { ServiceDependency, NewServiceDependency } from '../interface/interface';

export const getAllServiceDependencies = async (): Promise<ServiceDependency[]> => {
  const { data } = await axios.get('/service-dependency/all');
  return data;
};

export const getServiceDependencyById = async (
  id: number | string,
): Promise<ServiceDependency> => {
  const { data } = await axios.get(
    `/service-dependency/get-service-dependency-by-id/${id}`,
  );
  return data;
};

export const getOutgoingServiceDependencies = async (
  serviceId: number | string,
): Promise<ServiceDependency[]> => {
  const { data } = await axios.get(
    `/service-dependency/get-outgoing-by-service-id/${serviceId}`,
  );
  return data;
};

export const getIncomingServiceDependencies = async (
  serviceId: number | string,
): Promise<ServiceDependency[]> => {
  const { data } = await axios.get(
    `/service-dependency/get-incoming-by-service-id/${serviceId}`,
  );
  return data;
};

export const createNewServiceDependency = async (
  dependency: NewServiceDependency,
): Promise<ServiceDependency> => {
  const { data } = await axios.post(
    '/service-dependency/create-service-dependency',
    dependency,
  );
  return data;
};

export const updateServiceDependency = async (
  id: number | string,
  dependency: NewServiceDependency,
): Promise<ServiceDependency> => {
  const { data } = await axios.put(
    '/service-dependency/update-service-dependency',
    { id, ...dependency },
  );
  return data;
};

export const deleteServiceDependency = async (
    id: number | string,
  ): Promise<{ deleted: true }> => {
    const { data } = await axios.delete(
      `/service-dependency/delete-service-dependency?id=${id}`
    );
    return data;
  };
