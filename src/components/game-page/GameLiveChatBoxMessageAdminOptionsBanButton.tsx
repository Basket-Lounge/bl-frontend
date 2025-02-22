import { IGameChatMessage } from "@/models/game.models";
import ImageButton from "../common/ImageButton";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { GameStoreContext } from "@/stores/games.stores";
import { useStore } from "zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserBanInGameChat } from "@/api/admin.api";


const GameLiveChatBoxMessageAdminOptionsBanButton = (
  { message } : { message: IGameChatMessage }
) => {
  const {
    gameId,
  } = useParams<{ gameId: string }>();

  const store = useContext(GameStoreContext);
  const setBanUserModalOpen = useStore(store, (state) => state.setBanUserModalOpen);
  const gameChatBlacklist = useStore(store, (state) => state.gameChatBlacklist);
  const isUserBanned = gameChatBlacklist?.blacklist.bans.some((ban) => ban.user_data.id === message.user.id);

  const queryClient = useQueryClient();
  const unbanUserMutation = useMutation({
    mutationFn: () => {
      return updateUserBanInGameChat(
        gameId,
        message.user.id,
        false,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["game", gameId, "chat-blacklist"]
      });
    }
  });

  if (isUserBanned) {
    return (
      <ImageButton
        className="text-black rounded-md text-[14px] lg:text-[16px]"
        aria-label="unban"
        onClick={() => unbanUserMutation.mutate()}
        disabled={unbanUserMutation.isPending}
        pending={unbanUserMutation.isPending}
        aria-disabled={unbanUserMutation.isPending}
      >
        밴 해제
      </ImageButton>
    )
  }

  return (
    <ImageButton
      className="text-black rounded-md text-[14px] lg:text-[16px]"
      aria-label="mute"
      onClick={() => setBanUserModalOpen('md')}
    > 
      밴 추가
    </ImageButton>
  );
};

export default GameLiveChatBoxMessageAdminOptionsBanButton;