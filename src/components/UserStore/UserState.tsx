import { create } from 'zustand';
import axiosInstance from '../API/axios';
import { AxiosError } from 'axios';

interface UserState {
  user: object;
  isAuthenticated: boolean;
  error: string | null;
  setAppState: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: {},
  isAuthenticated: false,
  error: null,
  setAppState: async () => {
    set({ error: null });

    try {
      const response = await axiosInstance.get('/api/profil');
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        await refreshAccessToken(set);
        await retryAfterRefresh(set);
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

async function refreshAccessToken(set: (state: Partial<UserState>) => void) {
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
  } catch (error) {
    handleOtherErrors(set, error);
  }
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
