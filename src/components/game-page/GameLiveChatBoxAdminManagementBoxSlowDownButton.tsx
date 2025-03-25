import { useCallback, useContext } from "react";
import { GameStoreContext } from "@/stores/games.stores";
import ImageButton from "../common/ImageButton";
import { useStore } from "zustand";
import GameLiveChatBoxMessageAdminOptionsSlowDownModal from "./GameLiveChatBoxMessageAdminOptionsSlowDownModal";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setSlowModeGameChat } from "@/api/admin.api";


const GameLiveChatBoxAdminManagementBoxSlowDownButton = () => {
  const store = useContext(GameStoreContext);
  const gameChatBlacklist = useStore(store, (state) => state.gameChatBlacklist);
  const setSlowDownModalOpen = useStore(store, (state) => state.setSlowDownModalOpen);
  const gameId = gameChatBlacklist?.game_data.game_id;
  const slowMode = gameChatBlacklist?.slow_mode;

  const queryClient = useQueryClient();
  const unmuteEveryoneMutation = useMutation({
    mutationFn: (gameId: string) => {
      return setSlowModeGameChat(
        gameId,
        false,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["game", gameId, "chat-blacklist"]
      });
    }
  });

  const handleOpen = useCallback(() => {
    if (!gameId) {
      toast.error('게임 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setSlowDownModalOpen('md')
  }, [gameId]);

  const handleUnmuteClick = useCallback(() => {
    if (!gameId) {
      toast.error('게임 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }
  
    unmuteEveryoneMutation.mutate(gameId);
  }, [gameId]);

  if (!gameChatBlacklist) {
    return null
  }

  return (
    <>
      {(!slowMode) ? (
        <ImageButton
          className="text-white rounded-md text-[14px] lg:text-[16px] bg-green-500 px-[16px] py-[8px]"
          aria-label="mute-everyone"
          onClick={handleOpen}
        >
          슬로우 모드 설정
        </ImageButton>
      ) : (
        <ImageButton
          className="text-white rounded-md text-[14px] lg:text-[16px] bg-red-500 px-[16px] py-[8px]"
          aria-label="unmute-everyone"
          onClick={handleUnmuteClick}
          disabled={unmuteEveryoneMutation.isPending}
          pending={unmuteEveryoneMutation.isPending}
          aria-disabled={unmuteEveryoneMutation.isPending}
        >
          슬로우 모드 해제
        </ImageButton>
      )}
      <GameLiveChatBoxMessageAdminOptionsSlowDownModal gameId={gameChatBlacklist.game_data.game_id} />
    </>
  )
}

export default GameLiveChatBoxAdminManagementBoxSlowDownButton;