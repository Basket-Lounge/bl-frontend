import { BACKEND_SERVER_URL } from "@/constants/backend";
import axios, {AxiosRequestConfig} from "axios";


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

  axiosInstance.interceptors.request.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        // redirect to login page
        window.location.href = "/login"; 
        return
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

  axiosInstance.interceptors.request.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response?.status === 401) {
        // redirect to login page
        window.history.pushState({}, "", "/login");
        return
      }
      if (error.response?.status === 404) {
        // redirect to forbidden page
        window.history.pushState({}, "", "/forbidden");
        return
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export const httpClientFormData = createClientFormData();