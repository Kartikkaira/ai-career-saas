import axiosClient from './axiosClient';

export const analysisApi = {
  uploadAndAnalyze: async ({ file, resumeText, jobDescription, targetRole }) => {
    const formData = new FormData();
    if (file) {
      formData.append('resumePdf', file);
    }
    if (resumeText) {
      formData.append('resumeText', resumeText);
    }
    if (jobDescription) {
      formData.append('jobDescription', jobDescription);
    }
    if (targetRole) {
      formData.append('targetRole', targetRole);
    }

    const res = await axiosClient.post('/analysis/upload-and-analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  getHistory: async () => {
    const res = await axiosClient.get('/analysis/history');
    return res.data;
  },

  getAnalysisById: async (id) => {
    const res = await axiosClient.get(`/analysis/${id}`);
    return res.data;
  },

  deleteAnalysis: async (id) => {
    const res = await axiosClient.delete(`/analysis/${id}`);
    return res.data;
  },
};
