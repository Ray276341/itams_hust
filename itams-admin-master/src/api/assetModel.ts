import { AssetModelQuery, NewAssetModel } from '../interface/interface';
import axios from './axios';

export const getAllAssetModels = async (assetModelQuery?: AssetModelQuery) => {
  const data = await axios.get('/asset-model/all', { params: assetModelQuery });
  return data.data;
};

export const getAssetModelById = async (id: number | string) => {
  const response = await axios.get(`/asset-model/get-asset-model-by-id/${id}`);
  return response.data;
};

export const updateAssetModel = async (
  id: number | string,
  assetModel: NewAssetModel,
) => {
  const response = await axios.put('/asset-model/update-asset-model', {
    id: id,
    ...assetModel,
  });
  return response.data;
};

export const deleteAssetModel = async (id: number | string) => {
  const response = await axios.delete('/asset-model/delete-asset-model', {
    data: { id },
  });
  return response.data;
};

export const createNewAssetModel = async (assetModel: NewAssetModel) => {
  const response = await axios.post(
    '/asset-model/create-asset-model',
    assetModel,
  );
  return response.data;
};

export const saveImage = async (id: string, file: any) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('image', file, file.name);
  const data = await axios.post('/asset-model/save-image', formData, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data`,
    },
  });
  return data;
};
