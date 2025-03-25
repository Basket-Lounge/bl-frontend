import { getGameChatBanList } from "@/api/admin.api";
import { useAuthStore } from "@/stores/auth.stores";
import { GameStoreContext } from "@/stores/games.stores";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useStore } from "zustand";


const useLoadChatBlacklist = (gameId: string) => {
  const { 
    userRole,
    isAuthenticated
  } = useAuthStore();

  const store = useContext(GameStoreContext);
  const setGameChatBlacklist = useStore(store, (state) => state.setGameChatBlacklist);
  const setGameChatBlacklistError = useStore(store, (state) => state.setGameChatBlacklistError);
  const setGameChatBlacklistLoading = useStore(store, (state) => state.setGameChatBlacklistLoading);

  const chatBlacklistQuery = useQuery({
    queryKey: ["game", gameId, "chat-blacklist"],
    queryFn: async () => {
      if (isAuthenticated && userRole && userRole <= 3) {
        return await getGameChatBanList(gameId);
      }

      return null;
    },
    retry: 2,
    refetchInterval: 30000
  });

  useEffect(() => {
    if (chatBlacklistQuery.data) {
      setGameChatBlacklist(chatBlacklistQuery.data);
    }
  }, [chatBlacklistQuery.data]);

  useEffect(() => {
    if (chatBlacklistQuery.isError) {
      setGameChatBlacklist(null);
    }

    setGameChatBlacklistError(chatBlacklistQuery.isError);
  }, [chatBlacklistQuery.isError]);

  useEffect(() => {
    setGameChatBlacklistLoading(chatBlacklistQuery.isLoading);
  }, [chatBlacklistQuery.isLoading]);

  useEffect(() => {
    chatBlacklistQuery.refetch();
  }, [gameId]);
}

export default useLoadChatBlacklist;