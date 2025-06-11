import axios from './axios';
import { ServiceUsage, NewServiceUsage } from '../interface/interface';

export const createServiceUsage = async (
  usage: NewServiceUsage,
): Promise<ServiceUsage> => {
  const { data } = await axios.post('/service-usages', usage);
  return data;
};

export const getServiceUsageById = async (
  id: number | string,
): Promise<ServiceUsage> => {
  const { data } = await axios.get(`/service-usages/${id}`);
  return data;
};

export const getUsageByServiceId = async (
  serviceId: number | string,
): Promise<ServiceUsage[]> => {
  const { data } = await axios.get(
    `/service-usages/service/${serviceId}`,
  );
  return data;
};

export const getUsageByUserId = async (
  userId: number | string,
): Promise<ServiceUsage[]> => {
  const { data } = await axios.get(
    `/service-usages/user/${userId}`,
  );
  return data;
};

export const getUsageByMetric = async (
  metric: string,
): Promise<ServiceUsage[]> => {
  const { data } = await axios.get(
    `/service-usages/metric/${metric}`,
  );
  return data;
};

export const updateServiceUsage = async (
  id: number | string,
  usage: NewServiceUsage,
): Promise<ServiceUsage> => {
  const { data } = await axios.patch(
    `/service-usages/${id}`,
    usage,
  );
  return data;
};

export const deleteServiceUsage = async (
  id: number | string,
): Promise<{ deleted: true }> => {
  const { data } = await axios.delete(
    `/service-usages/${id}`,
  );
  return data;
};
