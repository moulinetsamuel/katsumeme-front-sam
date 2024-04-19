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

/*
// Intercepteur pour gérer les réponses 401
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://votre-api.com',
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Si la réponse est une erreur 401
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Récupérer le token de rafraîchissement depuis votre emplacement de stockage
      const refreshToken = localStorage.getItem('refreshToken');

      // Utiliser le token de rafraîchissement pour obtenir un nouveau token d'accès
      const newAccessToken = await fetchNewAccessToken(refreshToken);

      // Mettre à jour le header Authorization avec le nouveau token d'accès
      api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

      // Réessayer la requête initiale avec le nouveau token d'accès
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

// Fonction pour récupérer un nouveau token d'accès en utilisant le token de rafraîchissement
async function fetchNewAccessToken(refreshToken) {
  // Code pour appeler votre endpoint d'actualisation du token
  // Utilisez par exemple Axios ou fetch
}

// Exemple d'utilisation de l'API
async function fetchData() {
  try {
    const response = await api.get('/votre-route');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
}

// Appeler la fonction pour récupérer des données
fetchData();
 */
