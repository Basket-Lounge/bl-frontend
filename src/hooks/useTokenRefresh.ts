import { useEffect } from "react";

import { refreshAccessToken } from "@/api/login.api";
import { useAuthStore } from "@/stores/auth.stores";
import { useStore } from "zustand";


const useTokenRefresh = () => {
  const { 
    setUsername, 
    setIsAuthenticated 
  } = useStore(useAuthStore);

  useEffect(() => {
    refreshAccessToken().then((data) => {
      setIsAuthenticated(true);
    }).catch(() => {
      setIsAuthenticated(false);
    });

    // setInterval is used to refresh the token every 3 minutes
    const interval = setInterval(async () => {
      try { 
        const data = await refreshAccessToken();
        setUsername(data.username);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        setUsername("");
      }
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, []);
};

export default useTokenRefresh;