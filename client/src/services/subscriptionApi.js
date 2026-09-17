import axiosClient from './axiosClient';

export const subscriptionApi = {
  getPlans: async () => {
    const res = await axiosClient.get('/subscription/plans');
    return res.data;
  },

  createCheckoutSession: async (planId) => {
    const res = await axiosClient.post('/subscription/create-checkout-session', { planId });
    return res.data;
  },

  verifySession: async (sessionId, planId) => {
    const res = await axiosClient.post('/subscription/verify-session', { sessionId, planId });
    return res.data;
  },

  // Aliases for backward compatibility
  createOrder: async (planId) => {
    const res = await axiosClient.post('/subscription/create-checkout-session', { planId });
    return res.data;
  },

  verifyPayment: async (details) => {
    const res = await axiosClient.post('/subscription/verify-session', details);
    return res.data;
  },


  resetTier: async () => {
    const res = await axiosClient.post('/subscription/reset-tier');
    return res.data;
  },
};
