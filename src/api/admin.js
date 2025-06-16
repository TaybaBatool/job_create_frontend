import axios from './axiosInstance';

// 1. Add Super Admin
export const addSuperAdmin = async (data) => {
  return await axios.post('auth/add_superAdmin', data);
};

// 4. Add Admin
export const addAdmin = async (data) => {
  return await axios.post('auth/add_admin', data);
};

// 5. Update Admin Status
export const updateAdminStatus = async (id, status) => {
  return await axios.put(`auth/update_adminStatus`, null, {
    params: { id, status },
  });
};
export const updateAdmin = (data) => axios.put('auth/update_admin', data);
export const getAdmins = () => axios.get('auth/get_admin');