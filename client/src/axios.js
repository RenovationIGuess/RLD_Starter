import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`;
  return config;
});

export function add_axios_401_interceptor() {
  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      // 401 - Unauthorized
      if (err.response && err.response.status === 401) {
        const token = localStorage.getItem('TOKEN');
        if (token) {
          localStorage.removeItem('TOKEN');
        }
        return Promise.resolve(err);
      }
      throw err;
    }
  );
}

export default axiosClient;
