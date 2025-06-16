import axios from './axiosInstance';

// Login Admin
export const loginAdmin = async (data) => {
    return await axios.post('auth/login', data);
  };
  
  // Logout Admin
  export const logoutAdmin = async () => {
    return await axios.post('auth/logout');
  };
