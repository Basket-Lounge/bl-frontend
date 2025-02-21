import { IGameChatMessage } from "@/models/game.models";
import ImageButton from "../common/ImageButton";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { GameStoreContext } from "@/stores/games.stores";
import { useStore } from "zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { muteUserInGameChat } from "@/api/admin.api";


const GameLiveChatBoxMessageAdminOptionsMuteButton = (
  { message } : { message: IGameChatMessage }
) => {
  const {
    gameId,
  } = useParams<{ gameId: string }>();

  const store = useContext(GameStoreContext);
  const setMuteUserModalOpen = useStore(store, (state) => state.setMuteUserModalOpen);
  const gameChatBlacklist = useStore(store, (state) => state.gameChatBlacklist);
  const isUserMuted = gameChatBlacklist.mutes.some((mute) => mute.user_data.id === message.user.id);

  const queryClient = useQueryClient();
  const unmuteUserMutation = useMutation({
    mutationFn: () => {
      return muteUserInGameChat(
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

  if (isUserMuted) {
    return (
      <ImageButton
        className="text-black rounded-md text-[14px] lg:text-[16px]"
        aria-label="unmute"
        onClick={() => unmuteUserMutation.mutate()}
        disabled={unmuteUserMutation.isPending}
        pending={unmuteUserMutation.isPending}
        aria-disabled={unmuteUserMutation.isPending}
      >
        음소거 해제
      </ImageButton>
    )
  }

  return (
    <ImageButton
      className="text-black rounded-md text-[14px] lg:text-[16px]"
      aria-label="mute"
      onClick={() => setMuteUserModalOpen('md')}
    > 
      음소거 추가
    </ImageButton>
  );
};

export default GameLiveChatBoxMessageAdminOptionsMuteButton;