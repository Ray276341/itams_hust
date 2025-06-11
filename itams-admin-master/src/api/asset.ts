import {
  AcceptRequest,
  AssetQuery,
  CheckoutAsset,
  CheckinAsset,
  NewAsset,
  AssetHistoryQuery,
} from '../interface/interface';
import axios from './axios';

export const getAllAssets = async (assetQuery?: AssetQuery) => {
  const response = await axios.get('/asset/all-assets', { params: assetQuery });
  return response.data;
};

export const getDeletedAssets = async () => {
  const response = await axios.get('/asset/deleted-assets');
  return response.data;
};

export const getAssetHistory = async (
  AssetHistoryQuery?: AssetHistoryQuery,
) => {
  const response = await axios.get('/asset/asset-history', {
    params: AssetHistoryQuery,
  });
  return response.data;
};

export const getAssetById = async (id: number | string) => {
  const response = await axios.get(`/asset/get-asset-by-id/${id}`);
  return response.data;
};

export const updateAsset = async (id: number | string, asset: NewAsset) => {
  const response = await axios.put('/asset/update-asset', {
    id: id,
    ...asset,
  });
  return response.data;
};

export const deleteAsset = async (id: number | string) => {
  const response = await axios.delete('/asset/delete-asset', { data: { id } });
  return response.data;
};

export const createNewAsset = async (asset: NewAsset) => {
  const response = await axios.post('/asset/create-asset', asset);
  return response.data;
};

export const saveImage = async (id: string, file: any) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('image', file, file.name);
  const data = await axios.post('/asset/save-image', formData, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data`,
    },
  });
  return data;
};

export const checkoutAsset = async (asset: CheckoutAsset) => {
  const response = await axios.post('/asset/checkout-asset', asset);
  return response.data;
};

export const checkinAsset = async (asset: CheckinAsset) => {
  const response = await axios.post('/asset/checkin-asset', asset);
  return response.data;
};

export const importAsset = async (assets: NewAsset[]) => {
  const response = await axios.post('/asset/import-asset', assets);
  return response.data;
};

export const getAllRequestAssets = async () => {
  const response = await axios.get('/asset/all-request-assets');
  return response.data;
};

export const acceptRequest = async (acceptRequest: AcceptRequest) => {
  const response = await axios.post('/asset/accept-request', acceptRequest);
  return response.data;
};

export const rejectRequest = async (id: number | string) => {
  const response = await axios.post('/asset/reject-request', { id });
  return response.data;
};

export const getAssetsByCategory = async (categoryId: number | string) => {
  const response = await axios.get('/asset/asset-by-category', {
    params: { categoryId: categoryId },
  });
  return response.data;
};
