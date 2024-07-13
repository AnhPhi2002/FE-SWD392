
import Cookies from "js-cookie";

import { axiosClient } from './config/axios-client';

import { LoginType, RegisterType } from './types/auth';

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.Errors?.ErrorMessage || 'An unexpected error occurred.';
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error('An unexpected error occurred.');
  }
};

export const authAPI = {
  login: (values: LoginType) => {
    return axiosClient.post('/api/users/login', values);
  },
  register: (values: RegisterType) => {
    return axiosClient.post('/api/users/register', values);
  }
};
