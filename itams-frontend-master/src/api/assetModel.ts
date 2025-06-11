import axios from './axios';

export const getAllAssetModels = async () => {
  const data = await axios.get('/asset-model/all');
  return data.data;
};
