import { NewSupplier } from '../interface/interface';
import axios from './axios';

export const getAllSuppliers = async () => {
  const data = await axios.get('/supplier/all');
  return data.data;
};

export const getSupplierById = async (id: number | string) => {
  const response = await axios.get(`/supplier/get-supplier-by-id/${id}`);
  return response.data;
};

export const updateSupplier = async (
  id: number | string,
  supplier: NewSupplier,
) => {
  const response = await axios.put('/supplier/update-supplier', {
    id: id,
    ...supplier,
  });
  return response.data;
};

export const deleteSupplier = async (id: number | string) => {
  const response = await axios.delete('/supplier/delete-supplier', {
    data: { id },
  });
  return response.data;
};

export const createNewSupplier = async (supplier: NewSupplier) => {
  const response = await axios.post('/supplier/create-supplier', supplier);
  return response.data;
};
