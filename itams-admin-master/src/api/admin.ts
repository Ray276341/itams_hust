import axios from './axios';
import FormData from 'form-data';

export const updateProfile = async (profile: any) => {
  const data = await axios.put('/admin/update-profile', profile);
  return data;
};

export const saveAvatar = async (file: any) => {
  const formData = new FormData();
  formData.append('image', file, file.name);
  const data = await axios.post('/admin/save-avatar', formData, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data`,
    },
  });
  return data;
};
