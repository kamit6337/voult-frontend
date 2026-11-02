import axios from "axios";
import { navigateTo } from "./navigation";
import { queryClient } from "./queryClient";

export const SERVER_URL = import.meta.env.VITE_SERVER_URL!;

export const BASE_URL = SERVER_URL + "/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRedirecting = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Error", error);
    console.log("error.response?.status", error.response?.status);

    if (error.response?.status === 401) {
      const requestUrl = error.config?.url;

      console.log("requestUrl", requestUrl);

      // Avoid redirect loops for authentication endpoints
      // that intentionally return 401.
      const isAuthRequest =
        requestUrl?.includes("/signin") ||
        requestUrl?.includes("/signup") ||
        requestUrl?.includes("/oauth");

      if (!isAuthRequest && !isRedirecting) {
        isRedirecting = true;

        queryClient.clear();

        // window.location.replace(
        //   "/signin?errMsg=Unauthorized Access. Please sign in.",
        // );
        navigateTo("/signin?errMsg=Unauthorized Access. Please sign in.");
      }
    }
    return Promise.reject(error);
  },
);

export const getReq = async <T>(path: string, params?: any) => {
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
  body: Record<string, string | number | boolean | null>,
) => {
  try {
    const res = await api.post<T>(path, body);

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;

      if (message) {
        throw new Error(message);
      } else {
        throw error;
      }
    }
    throw error;
  }
};

export const patchReq = async <T>(
  path: string,
  body: Record<string, string | number | boolean | null>,
) => {
  try {
    const res = await api.patch<T>(path, body);

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
