import { NewLocation } from '../interface/interface';
import axios from './axios';

export const getAllLocations = async () => {
  const data = await axios.get('/location/all');
  return data.data;
};

export const getLocationById = async (id: number | string) => {
  const response = await axios.get(`/location/get-location-by-id/${id}`);
  return response.data;
};

export const updateLocation = async (
  id: number | string,
  location: NewLocation,
) => {
  const response = await axios.put('/location/update-location', {
    id: id,
    ...location,
  });
  return response.data;
};

export const deleteLocation = async (id: number | string) => {
  const response = await axios.delete('/location/delete-location', {
    data: { id },
  });
  return response.data;
};

export const createNewLocation = async (location: NewLocation) => {
  const response = await axios.post('/location/create-location', location);
  return response.data;
};
