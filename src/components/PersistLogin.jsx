import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth.jsx";

const PersistLogin = () => {
  const { auth } = useAuth();
  const refreshToken = useRefreshToken();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setLoading(false);
      }

      setLoading(false);
    };
    !auth?.accessToken ? verifyRefreshToken() : setLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return loading ? <p>Loading...</p> : <Outlet />;
};

export default PersistLogin;
