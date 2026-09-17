import { create } from 'zustand';

export const useUiStore = create((set) => ({
  authModalOpen: false,
  authModalMode: 'login', // 'login' | 'register'
  upgradeModalOpen: false,
  upgradeModalPlan: 'pro_monthly',
  toasts: [],

  openAuthModal: (mode = 'login') => set({ authModalOpen: true, authModalMode: mode }),
  closeAuthModal: () => set({ authModalOpen: false }),

  openUpgradeModal: (plan = 'pro_monthly') => set({ upgradeModalOpen: true, upgradeModalPlan: plan }),
  closeUpgradeModal: () => set({ upgradeModalOpen: false }),

  addToast: (message, type = 'info', duration = 4000) => {
    const id = Date.now().toString() + Math.random().toString();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
