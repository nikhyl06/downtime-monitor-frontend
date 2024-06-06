import axios from "../api/axios";
import useAuth from "./useAuth.jsx";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refreshToken = async () => {
    try {
      const response = await axios.get("/refresh");

      setAuth((prev) => {
        return {
          ...prev,
          user: response.data.user,
          roles: response.data.roles,
          accessToken: response.data.accessToken,
        };
      });
      return response.data.accessToken;
    } catch (error) {
      console.error("Error refreshing token", error);
    }
  };

  return refreshToken;
};

export default useRefreshToken;
