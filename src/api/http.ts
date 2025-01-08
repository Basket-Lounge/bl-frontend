import { BACKEND_SERVER_URL } from "@/constants/backend";
import axios, {AxiosError, AxiosRequestConfig} from "axios";


const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BACKEND_SERVER_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      "Time-Zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (!error.config?.url?.startsWith("/api/token/refresh/")) {
        if (error.response?.status === 401) {
          // redirect to home page
          window.location.href = "/"; 
          return
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export const httpClient = createClient();

export const createClientFormData = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BACKEND_SERVER_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // redirect to home page
        window.location.href = "/"; 
        return
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export const httpClientFormData = createClientFormData();