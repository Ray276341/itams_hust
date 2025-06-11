import { DepartmentQuery, NewDepartment } from '../interface/interface';
import axios from './axios';

export const getAllDepartments = async (departmentQuery?: DepartmentQuery) => {
  const data = await axios.get('/department/all', { params: departmentQuery });
  return data.data;
};

export const getDepartmentById = async (id: number | string) => {
  const response = await axios.get(`/department/get-department-by-id/${id}`);
  return response.data;
};

export const updateDepartment = async (
  id: number | string,
  department: NewDepartment,
) => {
  const response = await axios.put('/department/update-department', {
    id: id,
    ...department,
  });
  return response.data;
};

export const deleteDepartment = async (id: number | string) => {
  const response = await axios.delete('/department/delete-department', {
    data: { id },
  });
  return response.data;
};

export const createNewDepartment = async (department: NewDepartment) => {
  const response = await axios.post(
    '/department/create-department',
    department,
  );
  return response.data;
};
