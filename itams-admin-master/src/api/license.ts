import {
  CheckinLicense,
  CheckoutLicense,
  LicenseQuery,
  LicenseToAssetQuery,
  NewLicense,
} from '../interface/interface';
import axios from './axios';

export const getAllLicenses = async (licenseQuery?: LicenseQuery) => {
  const response = await axios.get('/license/all-licenses', {
    params: licenseQuery,
  });
  return response.data;
};

export const getLicenseById = async (id: number | string) => {
  const response = await axios.get(`/license/get-license-by-id/${id}`);
  return response.data;
};

export const getLicenseToAsset = async (
  licenseToAssetQuery?: LicenseToAssetQuery,
) => {
  const response = await axios.get('/license/license-to-asset', {
    params: licenseToAssetQuery,
  });
  return response.data;
};

export const updateLicense = async (
  id: number | string,
  license: NewLicense,
) => {
  const response = await axios.put('/license/update-license', {
    id: id,
    ...license,
  });
  return response.data;
};

export const deleteLicense = async (id: number | string) => {
  const response = await axios.delete('/license/delete-license', {
    data: { id },
  });
  return response.data;
};

export const createNewLicense = async (license: NewLicense) => {
  const response = await axios.post('/license/create-license', license);
  return response.data;
};

export const checkoutLicense = async (license: CheckoutLicense) => {
  const response = await axios.post('/license/checkout-license', license);
  return response.data;
};

export const checkinLicense = async (license: CheckinLicense) => {
  const response = await axios.post('/license/checkin-license', license);
  return response.data;
};
