import { create } from 'zustand';
import { resumeApi } from '../services/resumeApi';
import { INITIAL_RESUME_STATE } from '../utils/constants';

export const useResumeStore = create((set, get) => ({
  resumes: [],
  currentResume: JSON.parse(JSON.stringify(INITIAL_RESUME_STATE)),
  activeStep: 0,
  activeTemplate: 'standard-ats',
  isLoading: false,
  isSaving: false,
  isAiEnhancing: false,
  error: null,
  successMessage: null,

  setActiveStep: (step) => set({ activeStep: step }),

  setActiveTemplate: (templateId) => {
    const current = get().currentResume;
    set({
      activeTemplate: templateId,
      currentResume: { ...current, templateId },
    });
  },

  setCurrentResume: (resume) => {
    set({
      currentResume: resume,
      activeTemplate: resume.templateId || 'standard-ats',
    });
  },

  resetCurrentResume: () => {
    const fresh = JSON.parse(JSON.stringify(INITIAL_RESUME_STATE));
    delete fresh._id;
    set({
      currentResume: fresh,
      activeStep: 0,
      activeTemplate: 'standard-ats',
      error: null,
    });
  },

  updateSection: (sectionName, data) => {
    const current = get().currentResume;
    set({
      currentResume: {
        ...current,
        sections: {
          ...current.sections,
          [sectionName]: data,
        },
      },
    });
  },

  updateTitle: (title) => {
    const current = get().currentResume;
    set({
      currentResume: {
        ...current,
        title,
      },
    });
  },

  fetchResumes: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await resumeApi.getAllResumes();
      set({ resumes: data.resumes || [], isLoading: false });
    } catch (err) {
      set({
        isLoading: false,
        error: err.response?.data?.message || err.message,
      });
    }
  },

  loadResumeById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await resumeApi.getResumeById(id);
      if (data.resume) {
        set({
          currentResume: data.resume,
          activeTemplate: data.resume.templateId || 'standard-ats',
          isLoading: false,
        });
      }
    } catch (err) {
      set({
        isLoading: false,
        error: err.response?.data?.message || err.message,
      });
    }
  },

  saveCurrentResume: async () => {
    const resume = get().currentResume;
    set({ isSaving: true, error: null });
    try {
      let saved;
      if (resume._id) {
        const res = await resumeApi.updateResume(resume._id, resume);
        saved = res.resume;
      } else {
        const res = await resumeApi.createResume(resume);
        saved = res.resume;
      }
      set({
        currentResume: saved,
        isSaving: false,
        successMessage: 'Resume saved successfully!',
      });
      get().fetchResumes();
      return { success: true, resume: saved };
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      set({ isSaving: false, error: msg });
      return {
        success: false,
        message: msg,
        isUpgradeRequired: err.response?.data?.code === 'UPGRADE_REQUIRED',
      };
    }
  },

  deleteResume: async (id) => {
    try {
      await resumeApi.deleteResume(id);
      set({
        resumes: get().resumes.filter((r) => r._id !== id),
      });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  },

  duplicateResume: async (id) => {
    try {
      const data = await resumeApi.duplicateResume(id);
      if (data.resume) {
        set({ resumes: [data.resume, ...get().resumes] });
      }
      return { success: true, resume: data.resume };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
        isUpgradeRequired: err.response?.data?.code === 'UPGRADE_REQUIRED',
      };
    }
  },

  enhanceWithAi: async (type, payload) => {
    set({ isAiEnhancing: true, error: null });
    try {
      const res = await resumeApi.enhanceSection({ type, payload });
      set({ isAiEnhancing: false });
      return { success: true, data: res };
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      set({ isAiEnhancing: false, error: msg });
      return { success: false, message: msg };
    }
  },

  clearMessages: () => set({ error: null, successMessage: null }),
}));
