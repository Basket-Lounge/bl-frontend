import { useEffect } from "react";
import { refreshAccessToken } from "@/api/login.api";
import { useAuthStore } from "@/stores/auth.stores";
import { useStore } from "zustand";
import { useQuery } from "@tanstack/react-query";


const useTokenRefresh = () => {
  const { 
    setUserId,
    setUsername, 
    setUserRole,
    setIsAuthenticated,
    setAuthenticationAttempted
  } = useStore(useAuthStore);

  const accessTokenQuery = useQuery({
    queryKey: ["access-token"],
    queryFn: async () => {
      return await refreshAccessToken();
    },
    retry: 1,
  });

  useEffect(() => {
    // setInterval is used to refresh the token every 2 minutes
    const interval = setInterval(async () => {
      accessTokenQuery.refetch();
    }, 120 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (accessTokenQuery.data) {
      setUserId(accessTokenQuery.data.id);
      setUsername(accessTokenQuery.data.username);
      setUserRole(accessTokenQuery.data.role);
      setIsAuthenticated(true);
    }
  }, [accessTokenQuery.data]);

  useEffect(() => {
    if (accessTokenQuery.isError || accessTokenQuery.isRefetchError) {
      setUserId(null);
      setUsername(null);
      setUserRole(null);
      setIsAuthenticated(false);
    }
  }, [accessTokenQuery.isError, accessTokenQuery.isRefetchError]);

  useEffect(() => {
    if (!accessTokenQuery.isLoading)
      setAuthenticationAttempted(true);
  }, [accessTokenQuery.isLoading]);
};

export default useTokenRefresh;