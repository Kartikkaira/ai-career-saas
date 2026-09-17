import axiosClient from './axiosClient';

export const userApi = {
  getDashboardStats: async () => {
    const res = await axiosClient.get('/user/dashboard-stats');
    return res.data;
  },

  updateProfile: async (userData) => {
    const res = await axiosClient.put('/user/profile', userData);
    return res.data;
  },
};
