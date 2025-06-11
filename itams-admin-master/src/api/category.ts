import { NewCategory } from '../interface/interface';
import axios from './axios';

export const getAllCategories = async () => {
  const data = await axios.get('/category/all');
  return data.data;
};

export const getCategoryById = async (id: number | string) => {
  const response = await axios.get(`/category/get-category-by-id/${id}`);
  return response.data;
};

export const updateCategory = async (
  id: number | string,
  category: NewCategory,
) => {
  const response = await axios.put('/category/update-category', {
    id: id,
    ...category,
  });
  return response.data;
};

export const deleteCategory = async (id: number | string) => {
  const response = await axios.delete('/category/delete-category', {
    data: { id },
  });
  return response.data;
};

export const createNewCategory = async (category: NewCategory) => {
  const response = await axios.post('/category/create-category', category);
  return response.data;
};

export const saveImage = async (id: string, file: any) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('image', file, file.name);
  const data = await axios.post('/category/save-image', formData, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data`,
    },
  });
  return data;
};
