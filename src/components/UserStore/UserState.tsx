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
  refreshAccessToken: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: {},

  isAuthenticated: false,

  error: null,

  uploadCount: 0,

  incrementUploadCount: () =>
    set((state) => ({ uploadCount: state.uploadCount + 1 })),

  refreshAccessToken: async () => {
    set({ error: null });

    try {
      const responseRefresh = await axiosInstance.post('/api/auth/refresh', {
        refreshToken: getRefreshToken(),
      });
      localStorage.setItem(
        'tokens',
        JSON.stringify({
          accessToken: responseRefresh?.data?.accessToken,
          refreshToken: responseRefresh?.data?.refreshToken,
        })
      );
      await retryAfterRefresh(set);
    } catch (error) {
      handleOtherErrors(set, error);
    }
  },

  setAppState: async () => {
    set({ error: null });

    try {
      const response = await axiosInstance.get('/api/profil');
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        useUserStore.getState().refreshAccessToken();
      } else {
        handleOtherErrors(set, error);
      }
    }
  },
}));

function getRefreshToken() {
  const tokensString = localStorage.getItem('tokens');
  if (tokensString) {
    const tokens = JSON.parse(tokensString);
    return tokens.refreshToken;
  }
  return null;
}

async function retryAfterRefresh(set: (state: Partial<UserState>) => void) {
  try {
    const response = await axiosInstance.get('/api/profil');
    set({ user: response.data, isAuthenticated: true });
  } catch (error) {
    handleOtherErrors(set, error);
  }
}

function handleOtherErrors(
  set: (state: Partial<UserState>) => void,
  error: any
) {
  console.error('ErrorTEST:', error);
  set({
    isAuthenticated: false,
    error: "Une erreur s'est produite.",
  });
}

export default useUserStore;
