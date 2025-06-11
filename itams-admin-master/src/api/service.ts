import {
  CheckinService,
  CheckoutService,
  ServiceQuery,
  ServiceToUserQuery,
  NewService,
  ServicePrice,
  ServicePriceDto,
  AcceptRequestService
} from '../interface/interface';
import axios from './axios';

export const getAllServices = async (serviceQuery?: ServiceQuery) => {
  const response = await axios.get('/service/all-services', {
    params: serviceQuery,
  });
  return response.data;
};

export const getServiceById = async (id: number | string) => {
  const response = await axios.get(`/service/get-service-by-id/${id}`);
  return response.data;
};

export const getServiceToUser = async (
  serviceToUserQuery?: ServiceToUserQuery,
) => {
  const response = await axios.get('/service/service-to-user', {
    params: serviceToUserQuery,
  });
  return response.data;
};

export const updateService = async (
  id: number | string,
  service: NewService,
) => {
  const response = await axios.put('/service/update-service', {
    id: id,
    ...service,
  });
  return response.data;
};

export const deleteService = async (id: number | string) => {
  const response = await axios.delete('/service/delete-service', {
    data: { id },
  });
  return response.data;
};

export const createNewService = async (service: NewService) => {
  const response = await axios.post('/service/create-service', service);
  return response.data;
};

export const checkoutService = async (service: CheckoutService) => {
  const response = await axios.post('/service/checkout-service', service);
  return response.data;
};

export const checkinService = async (service: CheckinService) => {
  const response = await axios.post('/service/checkin-service', service);
  return response.data;
};

export const createServicePrice = async (
  dto: ServicePriceDto
): Promise<ServicePrice> => {
  const response = await axios.post(
    '/service/create-service-price',
    dto
  );
  return response.data;
};

export const getServicePrices = async (
  serviceId: number
): Promise<ServicePrice[]> => {
  const response = await axios.get(
    `/service/get-service-prices/${serviceId}`
  );
  return response.data;
};

export const getServicePriceById = async (
  servicePriceId: number
): Promise<ServicePrice> => {
  const response = await axios.get(
    `/service/get-service-price-by-id/${servicePriceId}`
  );
  return response.data;
};

export const updateServicePrice = async (
  dto: ServicePriceDto
): Promise<ServicePrice> => {
  const response = await axios.put(
    '/service/update-service-price',
    dto
  );
  return response.data;
};

export const deleteServicePrice = async (
  servicePriceId: number
): Promise<ServicePrice> => {
  const response = await axios.delete(
    '/service/delete-service-price',
    { params: { servicePriceId } }
  );
  return response.data;
};


export const getAllRequestServices = async () => {
  const response = await axios.get('/service/all-request-services');
  return response.data;
};

export const acceptRequest = async (acceptRequest: AcceptRequestService) => {
  const response = await axios.post('/service/accept-request', acceptRequest);
  return response.data;
};

export const rejectRequest = async (id: number | string) => {
  const response = await axios.post('/service/reject-request', { id });
  return response.data;
};

export const getServicesByCategory = async (categoryId: number | string) => {
  const response = await axios.get('/service/service-by-category', {
    params: { categoryId: categoryId },
  });
  return response.data;
};