import { NewManufacturer } from '../interface/interface';
import axios from './axios';

export const getAllManufacturers = async () => {
  const data = await axios.get('/manufacturer/all');
  return data.data;
};

export const getManufacturerById = async (id: number | string) => {
  const response = await axios.get(
    `/manufacturer/get-manufacturer-by-id/${id}`,
  );
  return response.data;
};

export const updateManufacturer = async (
  id: number | string,
  manufacturer: NewManufacturer,
) => {
  const response = await axios.put('/manufacturer/update-manufacturer', {
    id: id,
    ...manufacturer,
  });
  return response.data;
};

export const deleteManufacturer = async (id: number | string) => {
  const response = await axios.delete('/manufacturer/delete-manufacturer', {
    data: { id },
  });
  return response.data;
};

export const createNewManufacturer = async (manufacturer: NewManufacturer) => {
  const response = await axios.post(
    '/manufacturer/create-manufacturer',
    manufacturer,
  );
  return response.data;
};

export const saveImage = async (id: string, file: any) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('image', file, file.name);
  const data = await axios.post('/manufacturer/save-image', formData, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data`,
    },
  });
  return data;
};
