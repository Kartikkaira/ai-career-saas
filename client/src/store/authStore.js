import { create } from 'zustand';
import { authApi } from '../services/authApi';

const loadPersistedAuth = () => {
  try {
    const raw = localStorage.getItem('career_auth_state');
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.state || {};
    }
  } catch (e) {
    console.error('Error loading auth from localStorage', e);
  }
  return {};
};

const persisted = loadPersistedAuth();

export const useAuthStore = create((set, get) => ({
  user: persisted.user || null,
  accessToken: persisted.accessToken || null,
  refreshToken: persisted.refreshToken || null,
  isAuthenticated: Boolean(persisted.accessToken),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authApi.login({ email, password });
      const { user, accessToken, refreshToken } = data;
      set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem(
        'career_auth_state',
        JSON.stringify({ state: { user, accessToken, refreshToken } })
      );
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed';
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authApi.register({ name, email, password });
      const { user, accessToken, refreshToken } = data;
      set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem(
        'career_auth_state',
        JSON.stringify({ state: { user, accessToken, refreshToken } })
      );
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Registration failed';
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  fetchUser: async () => {
    if (!get().accessToken) return;
    try {
      const data = await authApi.getMe();
      if (data.user) {
        set({ user: data.user });
        const current = loadPersistedAuth();
        localStorage.setItem(
          'career_auth_state',
          JSON.stringify({ state: { ...current, user: data.user } })
        );
      }
    } catch (err) {
      console.warn('Failed to refresh user profile:', err.message);
    }
  },

  updateUserPlan: (newRole, subscription) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        role: newRole,
        subscription: subscription || currentUser.subscription,
      };
      set({ user: updatedUser });
      const current = loadPersistedAuth();
      localStorage.setItem(
        'career_auth_state',
        JSON.stringify({ state: { ...current, user: updatedUser } })
      );
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch (e) {
      // Ignore network errors on logout
    }
    localStorage.removeItem('career_auth_state');
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));
