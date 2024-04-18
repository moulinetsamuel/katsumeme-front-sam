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

export default axiosInstance;
