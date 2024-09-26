import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function getAccessToken() {
  const tokensString = localStorage.getItem('tokens');
  if (tokensString) {
    const tokens = JSON.parse(tokensString);
    return tokens.accessToken;
  }
  return null;
}

function getRefreshToken() {
  const tokensString = localStorage.getItem('tokens');
  if (tokensString) {
    const tokens = JSON.parse(tokensString);
    return tokens.refreshToken;
  }
  return null;
}

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.config.url != '/api/auth/refresh' &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();

      if (refreshToken && refreshToken !== '') {
        try {
          const response = await axiosInstance.post('/api/auth/refresh', {
            refreshToken,
          });
          const tokens = response.data;
          localStorage.setItem('tokens', JSON.stringify(tokens));
          return axiosInstance(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
