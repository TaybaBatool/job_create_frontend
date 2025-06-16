import axios from './axiosInstance';

export const getAreaCodes = () => 
    axios.get('areaCode/get_areaCode');

export const addAreaCode = (data) => 
    axios.post('areaCode/add_areaCode', data);

export const deleteAreaCode = (id) =>
  axios.delete('areaCode/delete_areaCode', {
    params: { id, is_deleted: true },
  });
