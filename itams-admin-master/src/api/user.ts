import { NewUser, UserQuery } from '../interface/interface';
import axios from './axios';

export const getAllUsers = async (userQuery?: UserQuery) => {
  const response = await axios.get('/user/all-users', { params: userQuery });
  return response.data;
};

export const getUserById = async (id: number | string) => {
  const response = await axios.get(`/user/get-user-by-id/${id}`);
  return response.data;
};

export const updateUser = async (id: number | string, user: NewUser) => {
  const response = await axios.put('/user/update-user', {
    id: id,
    ...user,
  });
  return response.data;
};

export const deleteUser = async (id: number | string) => {
  const response = await axios.delete('/user/delete-user', {
    data: { id },
  });
  return response.data;
};

export const createNewUser = async (user: NewUser) => {
  const response = await axios.post('/user/create-user', user);
  return response.data;
};

export const importUser = async (users: NewUser[]) => {
  const response = await axios.post('/user/import-user', users);
  return response.data;
};
