import axios from './axios';

export const auth = async () => {
  const data = await axios.get('/auth');
  return data.data;
};

export const login = async (username: string, password: string) => {
  const data = await axios.post('/auth/login', {
    username,
    password,
  });
  window.localStorage.setItem('access-token', data.data.access_token);
  return data;
};

export const logout = async () => {
  // const data = await axios.post('/auth/logout');
  window.localStorage.removeItem('access-token');
  // return data;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  const data = await axios.post('/auth/change-password', {
    currentPassword,
    newPassword,
  });
  return data.data;
};
