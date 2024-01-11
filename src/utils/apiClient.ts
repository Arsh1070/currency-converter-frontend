import axios from 'axios';

const getBaseUrl = () => {
  let url;
  switch (import.meta.env.MODE) {
    case 'production':
      url = import.meta.env.VITE_APP_PROD_URL;
      break;
    case 'development':
    default:
      url = import.meta.env.VITE_APP_DEV_URL;
  }

  return url;
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {},
  data: {},
});

export default apiClient;
