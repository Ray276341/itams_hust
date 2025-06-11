import axios from './axios';

export const getAllNotifications = async () => {
  const data = await axios.get('/notification/all');
  return data.data;
};
