import axios from "axios";
import { navigateTo } from "./navigation";

export const SERVER_URL = import.meta.env.VITE_SERVER_URL!;

export const BASE_URL = SERVER_URL + "/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      navigateTo("/signin?errMsg=Unauthorized Access. Please sign in.");
    }
    return Promise.reject(error);
  },
);

export const getReq = async <T>(
  path: string,
  params?: Record<string, string | number | boolean>,
) => {
  try {
    const res = await api.get<T>(path, {
      params,
    });

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data ?? error;
    }
    throw error;
  }
};

export const postReq = async <T>(
  path: string,
  body: Record<string, string | number | boolean>,
) => {
  try {
    const res = await api.post<T>(path, body);

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data ?? error;
    }
    throw error;
  }
};

export const deleteReq = async <T>(
  path: string,
  params?: Record<string, string | number | boolean>,
) => {
  try {
    const res = await api.delete<T>(path, {
      params,
    });

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data ?? error;
    }
    throw error;
  }
};
