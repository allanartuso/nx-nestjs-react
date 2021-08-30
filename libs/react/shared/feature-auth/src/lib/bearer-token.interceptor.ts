import axios from 'axios';
import { authService } from './auth.service';

axios.interceptors.request.use(function (config) {
  const token = authService.getToken();

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };

  return config;
});
