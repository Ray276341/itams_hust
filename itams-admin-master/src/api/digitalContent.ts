import {
  CheckinDigitalContent,
  CheckoutDigitalContent,
  DigitalContentToSourceCodeQuery,
  NewDigitalContent,
} from '../interface/interface';
import axios from './axios';

export const getAllDigitalContents = async () => {
  const data = await axios.get('/digital-content/all');
  return data.data;
};

export const getDigitalContentById = async (id: number | string) => {
  const response = await axios.get(
    `/digital-content/get-digital-content-by-id/${id}`,
  );
  return response.data;
};

export const getDigitalContentToSourceCode = async (
  digitalContentToSourceCodeQuery?: DigitalContentToSourceCodeQuery,
) => {
  const response = await axios.get(
    '/digital-content/digital-content-to-source-code',
    {
      params: digitalContentToSourceCodeQuery,
    },
  );
  return response.data;
};

export const updateDigitalContent = async (
  id: number | string,
  digitalContent: NewDigitalContent,
) => {
  const response = await axios.put('/digital-content/update-digital-content', {
    id: id,
    ...digitalContent,
  });
  return response.data;
};

export const deleteDigitalContent = async (id: number | string) => {
  const response = await axios.delete(
    '/digital-content/delete-digital-content',
    {
      data: { id },
    },
  );
  return response.data;
};

export const createNewDigitalContent = async (
  digitalContent: NewDigitalContent,
) => {
  const response = await axios.post(
    '/digital-content/create-digital-content',
    digitalContent,
  );
  return response.data;
};

export const checkoutDigitalContent = async (
  digitalContent: CheckoutDigitalContent,
) => {
  const response = await axios.post(
    '/digital-content/checkout-digital-content',
    digitalContent,
  );
  return response.data;
};

export const checkinDigitalContent = async (
  digitalContent: CheckinDigitalContent,
) => {
  const response = await axios.post(
    '/digital-content/checkin-digital-content',
    digitalContent,
  );
  return response.data;
};
