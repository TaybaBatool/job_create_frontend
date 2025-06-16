import axios from './axiosInstance';

export const addSupportStaff = (data) =>
  axios.post('/supportStaff/add_supportStaff', data);

export const updateSupportStaff = (data) =>
  axios.put('/supportStaff/update_supportStaff', data);

export const updateSupportStaffStatus = (id, status) =>
  axios.put('/supportStaff/update_supportStaffStatus', null, {
    params: { id, status },
  });

export const getSupportStaff = () =>
  axios.get('/supportStaff/get_supportStaff');
