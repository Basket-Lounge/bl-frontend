import { useEffect } from "react";

import { refreshAccessToken } from "@/api/login.api";
import { useAuthStore } from "@/stores/auth.stores";
import { useStore } from "zustand";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";


const useTokenRefresh = () => {
  const { 
    setUserId,
    setUsername, 
    setIsAuthenticated,
    setAuthenticationAttempted
  } = useStore(useAuthStore);

  const accessTokenQuery = useQuery({
    queryKey: ["access-token"],
    queryFn: async () => {
      return await refreshAccessToken();
    },
    retry: 2,
  });

  useEffect(() => {
    // setInterval is used to refresh the token every 3 minutes
    const interval = setInterval(async () => {
      accessTokenQuery.refetch();
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (accessTokenQuery.data) {
      setUserId(accessTokenQuery.data.id);
      setUsername(accessTokenQuery.data.username);
      setIsAuthenticated(true);
    }
  }, [accessTokenQuery.data]);

  useEffect(() => {
    if (accessTokenQuery.isError) {
      setUserId(null);
      setUsername(null);
      setIsAuthenticated(false);
    }
  }, [accessTokenQuery.isLoading]);

  useEffect(() => {
    if (!accessTokenQuery.isLoading)
      setAuthenticationAttempted(true);
  }, [accessTokenQuery.isLoading]);
};

export default useTokenRefresh;