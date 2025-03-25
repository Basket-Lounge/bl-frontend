import { getBlockedUsers } from "@/api/user.api";
import { useAuthStore } from "@/stores/auth.stores";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


const useLoadUserBlacklist = () => {
  const { 
    isAuthenticated,
    setUserBlocklist,
    setUserBlocklistError,
    setUserBlocklistLoading
  } = useAuthStore();

  const userBlocklistQuery = useQuery({
    queryKey: ["blocklist"],
    queryFn: async () => {
      if (isAuthenticated) {
        return await getBlockedUsers();
      }

      return null;
    },
    retry: 2,
    refetchInterval: 60000
  });

  useEffect(() => {
    if (userBlocklistQuery.data) {
      setUserBlocklist(userBlocklistQuery.data);
    }
  }, [userBlocklistQuery.data]);

  useEffect(() => {
    if (userBlocklistQuery.isError) {
      setUserBlocklist(null);
    }

    setUserBlocklistError(userBlocklistQuery.isError);
  }, [userBlocklistQuery.isError]);

  useEffect(() => {
    setUserBlocklistLoading(userBlocklistQuery.isLoading);
  }, [userBlocklistQuery.isLoading]);

  useEffect(() => {
    if (isAuthenticated) {
      userBlocklistQuery.refetch();
    } else {
      setUserBlocklist(null);
    }
  }, [isAuthenticated]);
}

export default useLoadUserBlacklist;