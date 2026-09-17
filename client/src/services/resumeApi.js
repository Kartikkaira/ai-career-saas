import axiosClient from './axiosClient';

export const resumeApi = {
  getAllResumes: async () => {
    const res = await axiosClient.get('/resumes');
    return res.data;
  },

  getResumeById: async (id) => {
    const res = await axiosClient.get(`/resumes/${id}`);
    return res.data;
  },

  createResume: async (resumeData) => {
    const res = await axiosClient.post('/resumes', resumeData);
    return res.data;
  },

  updateResume: async (id, resumeData) => {
    const res = await axiosClient.put(`/resumes/${id}`, resumeData);
    return res.data;
  },

  deleteResume: async (id) => {
    const res = await axiosClient.delete(`/resumes/${id}`);
    return res.data;
  },

  duplicateResume: async (id) => {
    const res = await axiosClient.post(`/resumes/${id}/duplicate`);
    return res.data;
  },

  enhanceSection: async ({ type, payload }) => {
    const res = await axiosClient.post('/resumes/enhance-section', { type, payload });
    return res.data;
  },
};
