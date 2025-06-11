import axios from './axios';
import { LicenseUsage, NewLicenseUsage } from '../interface/interface';

export const createLicenseUsage = async (
  usage: NewLicenseUsage,
): Promise<LicenseUsage> => {
  const { data } = await axios.post('/license-usages', usage);
  return data;
};

export const getLicenseUsageById = async (
  id: number | string,
): Promise<LicenseUsage> => {
  const { data } = await axios.get(`/license-usages/${id}`);
  return data;
};

export const getUsageByLicenseId = async (
  licenseId: number | string,
): Promise<LicenseUsage[]> => {
  const { data } = await axios.get(
    `/license-usages/license/${licenseId}`,
  );
  return data;
};

export const getUsageByAssetId = async (
  assetId: number | string,
): Promise<LicenseUsage[]> => {
  const { data } = await axios.get(
    `/license-usages/asset/${assetId}`,
  );
  return data;
};

export const getUsageByMetric = async (
  metric: string,
): Promise<LicenseUsage[]> => {
  const { data } = await axios.get(
    `/license-usages/metric/${metric}`,
  );
  return data;
};

export const updateLicenseUsage = async (
  id: number | string,
  usage: NewLicenseUsage,
): Promise<LicenseUsage> => {
  const { data } = await axios.patch(
    `/license-usages/${id}`,
    usage,
  );
  return data;
};

export const deleteLicenseUsage = async (
  id: number | string,
): Promise<{ deleted: true }> => {
  const { data } = await axios.delete(
    `/license-usages/${id}`,
  );
  return data;
};
