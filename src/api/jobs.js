import axios from './axiosInstance';

export const addJob = async (jobData) => {
  return await axios.post(`job/add_job`, jobData);
};

export const getAllJobs = async () => {
  return await axios.get(`job/get_job`);
};

export const getJobById = async (id) => {
  return await axios.get(`job/get_job_by_id?id=${id}`);
};

export const updateJobStatus = async (id, status) => {
  return await axios.put(`job/update_job_status?id=${id}&status=${status}`);
};

export const getInvoice = async (id) => {
  return await axios.get(`job/get_invoice?id=${id}`, { responseType: "blob" });
};
export const getDashboardJob = async (month, year) => {
  return await axios.get(`/job/dashboard?month=${month}&year=${year}`);
};

