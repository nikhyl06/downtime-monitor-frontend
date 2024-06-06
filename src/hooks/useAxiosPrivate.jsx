import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth.jsx";

const useAxiosPrivate = () => {
  const refreshToken = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error?.config;
        if (error?.response?.status === 403 && !originalRequest?.sent) {
          originalRequest.sent = true;
          const accessToken = await refreshToken();
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosPrivate(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refreshToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
