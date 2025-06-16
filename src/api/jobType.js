import axios from './axiosInstance';

export const addJobType = (data) =>
  axios.post('jobType/add_jobType', data);

export const updateJobType = (data) =>
  axios.put('jobType/update_jobType', data);

export const deleteJobType = (id, is_deleted = true) =>
  axios.delete('jobType/delete_jobType', {
    params: { id, is_deleted },
  });

export const getJobTypes = () =>
  axios.get('jobType/get_jobType');
