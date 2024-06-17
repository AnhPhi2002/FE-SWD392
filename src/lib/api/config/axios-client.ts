
      import axios from 'axios';
    
      export const axiosClient = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
          'Content-type': 'application/json',
        },
      });

      axiosClient.interceptors.request.use(
        async (config) => {
          const token = localStorage.getItem('accessToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.Accept = 'application/json';
            config.headers['Content-Type'] = 'application/json';
          }
          return config;
        },
        (error) => {
          Promise.reject(error);
        },
      );
