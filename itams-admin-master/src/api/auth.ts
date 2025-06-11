import axios from './axios';

export const auth = async () => {
  const data = await axios.get('/auth/admin');
  return data.data;
};

export const login = async (username: string, password: string) => {
  const data = await axios.post('/auth/login-admin', {
    username,
    password,
  });
  window.localStorage.setItem('access-token-admin', data.data.access_token);
  return data;
};

export const logout = async () => {
  // const data = await axios.post('/auth/logout');
  window.localStorage.removeItem('access-token-admin');
  // return data;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  const data = await axios.post('/auth/change-password-admin', {
    currentPassword,
    newPassword,
  });
  return data.data;
};
