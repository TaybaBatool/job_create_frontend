import axios from './axiosInstance';

export const addCustomer = async (payload) => {
  return axios.post(`customer/add_customer`, payload);
};

export const updateCustomer = async (payload) => {
  return axios.put(`customer/update_customer`, payload);
};

export const updateCustomerStatus = async (id, status) => {
  return axios.put(`customer/update_customerStatus`, null, {
    params: { id, status }
  });
};

export const deleteCustomer = async (id) => {
  return axios.delete(`customer/delete_customer`, {
    params: { id, is_deleted: true }
  });
};

export const getCustomers = async () => {
  return axios.get(`customer/get_customer`);
};
