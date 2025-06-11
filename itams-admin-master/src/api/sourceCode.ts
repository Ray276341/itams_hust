import {
  CheckinSourceCode,
  CheckoutSourceCode,
  NewSourceCode,
  SourceCodeToUserQuery,
} from '../interface/interface';
import axios from './axios';

export const getAllSourceCodes = async () => {
  const data = await axios.get('/source-code/all');
  return data.data;
};

export const getSourceCodeById = async (id: number | string) => {
  const response = await axios.get(`/source-code/get-source-code-by-id/${id}`);
  return response.data;
};

export const getSourceCodeToUser = async (
  sourceCodeToUserQuery?: SourceCodeToUserQuery,
) => {
  const response = await axios.get('/source-code/source-code-to-user', {
    params: sourceCodeToUserQuery,
  });
  return response.data;
};

export const updateSourceCode = async (
  id: number | string,
  sourceCode: NewSourceCode,
) => {
  const response = await axios.put('/source-code/update-source-code', {
    id: id,
    ...sourceCode,
  });
  return response.data;
};

export const deleteSourceCode = async (id: number | string) => {
  const response = await axios.delete('/source-code/delete-source-code', {
    data: { id },
  });
  return response.data;
};

export const createNewSourceCode = async (sourceCode: NewSourceCode) => {
  const response = await axios.post(
    '/source-code/create-source-code',
    sourceCode,
  );
  return response.data;
};

export const checkoutSourceCode = async (sourceCode: CheckoutSourceCode) => {
  const response = await axios.post(
    '/source-code/checkout-source-code',
    sourceCode,
  );
  return response.data;
};

export const checkinSourceCode = async (sourceCode: CheckinSourceCode) => {
  const response = await axios.post(
    '/source-code/checkin-source-code',
    sourceCode,
  );
  return response.data;
};
