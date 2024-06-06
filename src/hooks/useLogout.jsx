import axios from "../api/axios";
import useAuth from "./useAuth.jsx";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      await axios.get("/logout");
      setAuth(null);
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return logout;
};

export default useLogout;
