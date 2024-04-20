import { create } from 'zustand';
import axiosInstance from '../API/axios';
import { AxiosError } from 'axios';

interface UserState {
  user: object;
  isAuthenticated: boolean;
  error: string | null;
  setAppState: () => void;
  uploadCount: number;
  incrementUploadCount: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: {},

  isAuthenticated: false,

  error: null,

  uploadCount: 0,

  incrementUploadCount: () =>
    set((state) => ({ uploadCount: state.uploadCount + 1 })),

  setAppState: async () => {
    set({ error: null });

    try {
      const response = await axiosInstance.get('/api/profil');
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      set({
        isAuthenticated: false,
        error: "Une erreur s'est produite.",
      });
    }
  },
}));

export default useUserStore;
