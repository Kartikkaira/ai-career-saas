import { create } from 'zustand';
import { analysisApi } from '../services/analysisApi';

export const useAnalysisStore = create((set, get) => ({
  currentAnalysis: null,
  analysisHistory: [],
  isAnalyzing: false,
  isLoadingHistory: false,
  error: null,
  upgradeModalOpen: false,

  setUpgradeModalOpen: (open) => set({ upgradeModalOpen: open }),

  uploadAndAnalyze: async ({ file, resumeText, jobDescription, targetRole }) => {
    set({ isAnalyzing: true, error: null });
    try {
      const data = await analysisApi.uploadAndAnalyze({
        file,
        resumeText,
        jobDescription,
        targetRole,
      });
      set({
        currentAnalysis: data.analysis,
        isAnalyzing: false,
      });
      // Refresh history
      get().fetchHistory();
      return { success: true, analysis: data.analysis };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Analysis failed';
      const isUpgrade = err.response?.data?.code === 'UPGRADE_REQUIRED';
      set({
        isAnalyzing: false,
        error: msg,
        upgradeModalOpen: isUpgrade,
      });
      return { success: false, message: msg, isUpgradeRequired: isUpgrade };
    }
  },

  fetchHistory: async () => {
    set({ isLoadingHistory: true });
    try {
      const data = await analysisApi.getHistory();
      set({
        analysisHistory: data.analyses || [],
        isLoadingHistory: false,
      });
    } catch (err) {
      set({
        isLoadingHistory: false,
        error: err.response?.data?.message || err.message,
      });
    }
  },

  loadAnalysisById: async (id) => {
    set({ isAnalyzing: true, error: null });
    try {
      const data = await analysisApi.getAnalysisById(id);
      set({
        currentAnalysis: data.analysis,
        isAnalyzing: false,
      });
      return { success: true, analysis: data.analysis };
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      set({ isAnalyzing: false, error: msg });
      return { success: false, message: msg };
    }
  },

  deleteAnalysis: async (id) => {
    try {
      await analysisApi.deleteAnalysis(id);
      set({
        analysisHistory: get().analysisHistory.filter((a) => a._id !== id),
      });
      if (get().currentAnalysis?._id === id) {
        set({ currentAnalysis: null });
      }
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  },

  clearCurrentAnalysis: () => set({ currentAnalysis: null, error: null }),
}));
