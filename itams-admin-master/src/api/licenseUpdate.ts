import axios from './axios';
import { LicenseUpdate, NewLicenseUpdate } from '../interface/interface';

export const getAllLicenseUpdates = async (): Promise<LicenseUpdate[]> => {
  const { data } = await axios.get('/license-updates');
  return data;
};

export const getLicenseUpdateById = async (
  id: number | string,
): Promise<LicenseUpdate> => {
  const { data } = await axios.get(`/license-updates/${id}`);
  return data;
};

export const getLicenseUpdatesByLicenseId = async (
  licenseId: number | string,
): Promise<LicenseUpdate[]> => {
  const { data } = await axios.get(
    `/license-updates/license/${licenseId}`,
  );
  return data;
};

export const createNewLicenseUpdate = async (
  update: NewLicenseUpdate,
): Promise<LicenseUpdate> => {
  const { data } = await axios.post(
    '/license-updates',
    update,
  );
  return data;
};

export const updateLicenseUpdate = async (
  id: number | string,
  update: NewLicenseUpdate,
): Promise<LicenseUpdate> => {
  const { data } = await axios.patch(
    `/license-updates/${id}`,
    update,
  );
  return data;
};

export const deleteLicenseUpdate = async (
  id: number | string,
): Promise<{ deleted: true }> => {
  const { data } = await axios.delete(
    `/license-updates/${id}`,
  );
  return data;
};
