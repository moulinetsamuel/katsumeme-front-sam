import { create } from 'zustand';
import axiosInstance from '../API/axios';

interface UserState {
  user: object;
  isAuthenticated: boolean;
  setAppState: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: {},
  isAuthenticated: false,
  setAppState: async () => {
    try {
      const response = await axiosInstance.get('/api/profil');

      if (response.status === 200) {
        set((state) => ({
          user: (state.user = response.data),
          isAuthenticated: (state.isAuthenticated = true),
        }));
      }
    } catch (error) {
      set((state) => ({
        user: (state.user = {}),
        isAuthenticated: (state.isAuthenticated = false),
      }));
      localStorage.clear();
    }
  },
}));

export default useUserStore;
