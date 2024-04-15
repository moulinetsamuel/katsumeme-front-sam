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
        console.log('access token ok');

        set((state) => ({
          user: (state.user = response.data),
          isAuthenticated: (state.isAuthenticated = true),
        }));
      }
    } catch (error) {
      if ((error as any).response) {
        if ((error as any).response.status === 401) {
          console.log('access token 401');
          try {
            const response = await axiosInstance.post(
              '/api/auth/refresh',
              JSON.stringify({
                refreshToken: JSON.parse(localStorage.getItem('refreshToken')),
              }),
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false,
              }
            );

            if (response.status === 200) {
              console.log('refresh token ok');

              localStorage.setItem(
                'accessToken',
                JSON.stringify(response?.data?.accessToken)
              );
              localStorage.setItem(
                'refreshToken',
                JSON.stringify(response?.data?.refreshToken)
              );
              set((state) => ({
                user: (state.user = response.data),
                isAuthenticated: (state.isAuthenticated = true),
              }));
            }
          } catch (error) {
            console.log('refresh token 401');

            set((state) => ({
              user: (state.user = {}),
              isAuthenticated: (state.isAuthenticated = false),
            }));
            localStorage.clear();
          }
        }
      } else {
        console.log('error');

        set((state) => ({
          user: (state.user = {}),
          isAuthenticated: (state.isAuthenticated = false),
        }));
        localStorage.clear();
      }
    }
  },
}));

export default useUserStore;
