import {
  AssetMaintenanceQuery,
  NewAssetMaintenance,
} from '../interface/interface';
import axios from './axios';

export const getAllAssetMaintenances = async (
  assetMaintenanceQuery?: AssetMaintenanceQuery,
) => {
  const data = await axios.get('/asset-maintenance/all', {
    params: assetMaintenanceQuery,
  });
  return data.data;
};

export const getAssetMaintenanceById = async (id: number | string) => {
  const response = await axios.get(
    '/asset-maintenance/get-asset-maintenance-by-id',
    {
      data: { id },
    },
  );
  return response.data;
};

export const updateAssetMaintenance = async (
  id: number | string,
  assetMaintenance: NewAssetMaintenance,
) => {
  const response = await axios.put(
    '/asset-maintenance/update-asset-maintenance',
    {
      id: id,
      ...assetMaintenance,
    },
  );
  return response.data;
};

export const deleteAssetMaintenance = async (id: number | string) => {
  const response = await axios.delete(
    '/asset-maintenance/delete-asset-maintenance',
    {
      data: { id },
    },
  );
  return response.data;
};

export const createNewAssetMaintenance = async (
  assetMaintenance: NewAssetMaintenance,
) => {
  const response = await axios.post(
    '/asset-maintenance/create-asset-maintenance',
    assetMaintenance,
  );
  return response.data;
};
