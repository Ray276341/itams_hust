import axios from './axios';
import { LicenseDependency, NewLicenseDependency } from '../interface/interface';

export const getAllLicenseDependencies = async (): Promise<LicenseDependency[]> => {
  const { data } = await axios.get('/license-dependency/all');
  return data;
};

export const getLicenseDependencyById = async (
  id: number | string,
): Promise<LicenseDependency> => {
  const { data } = await axios.get(
    `/license-dependency/get-license-dependency-by-id/${id}`,
  );
  return data;
};

export const getOutgoingLicenseDependencies = async (
  licenseId: number | string,
): Promise<LicenseDependency[]> => {
  const { data } = await axios.get(
    `/license-dependency/get-outgoing-by-license-id/${licenseId}`,
  );
  return data;
};

export const getIncomingLicenseDependencies = async (
  licenseId: number | string,
): Promise<LicenseDependency[]> => {
  const { data } = await axios.get(
    `/license-dependency/get-incoming-by-license-id/${licenseId}`,
  );
  return data;
};

export const createNewLicenseDependency = async (
  dependency: NewLicenseDependency,
): Promise<LicenseDependency> => {
  const { data } = await axios.post(
    '/license-dependency/create-license-dependency',
    dependency,
  );
  return data;
};

export const updateLicenseDependency = async (
  id: number | string,
  dependency: NewLicenseDependency,
): Promise<LicenseDependency> => {
  const { data } = await axios.put(
    '/license-dependency/update-license-dependency',
    { id, ...dependency },
  );
  return data;
};

export const deleteLicenseDependency = async (
    id: number | string,
  ): Promise<{ deleted: true }> => {
    const { data } = await axios.delete(
      `/license-dependency/delete-license-dependency?id=${id}`
    );
    return data;
  };
