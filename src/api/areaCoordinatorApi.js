import axios from './axiosInstance';

export const addAreaCoordinator = (data) =>
  axios.post('/areaCoordinator/add_areaCoordinator', data);

export const updateAreaCoordinator = (data) =>
  axios.put('areaCoordinator/update_areaCoordinator', data);

export const updateAreaCoordinatorStatus = (id, status) =>
  axios.put('areaCoordinator/update_areaCoordinatorStatus', null, {
    params: { id, status },
  });

export const getAreaCoordinators = () =>
  axios.get('areaCoordinator/get_areaCoordinator');
