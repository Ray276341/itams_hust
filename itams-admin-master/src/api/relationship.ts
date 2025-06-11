import { NewRelationship } from '../interface/interface';
import axios from './axios';

export const getAllRelationships = async () => {
  const data = await axios.get('/relationship/all');
  return data.data;
};

export const getRelationshipById = async (id: number | string) => {
  const response = await axios.get(`/relationship/get-relationship-by-id/${id}`);
  return response.data;
};

export const updateRelationship = async (
  id: number | string,
  relationship: NewRelationship,
) => {
  const response = await axios.put('/relationship/update-relationship', {
    id: id,
    ...relationship,
  });
  return response.data;
};

export const deleteRelationship = async (id: number | string) => {
  const response = await axios.delete('/relationship/delete-relationship', {
    data: { id },
  });
  return response.data;
};

export const createNewRelationship = async (relationship: NewRelationship) => {
  const response = await axios.post('/relationship/create-relationship', relationship);
  return response.data;
};
