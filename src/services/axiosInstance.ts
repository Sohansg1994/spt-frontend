import axios, { InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

// Function to create axios instance with dynamic baseURL
export const createAxiosInstance = (baseURL: string) => {
  const authAxiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request Interceptor: Add token from cookies
  authAxiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = Cookies.get("access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor: Handle 403
  authAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 403) {
        Cookies.remove("access_token");
        toast("Your session has expired. Please sign in again to continue.", {
          icon: "⚠️",
        });
        window.location.href = "/sign-in";
      }
      return Promise.reject(error);
    }
  );

  return authAxiosInstance;
};

// Utility to set headers dynamically
export const setHeaders = (
  axiosInstance: any,
  headers: Record<string, string>
) => {
  Object.assign(axiosInstance.defaults.headers.common, headers);
};

// Utility to reset headers
export const resetHeaders = (axiosInstance: any) => {
  axiosInstance.defaults.headers.common = {
    "Content-Type": "application/json",
  };
};
