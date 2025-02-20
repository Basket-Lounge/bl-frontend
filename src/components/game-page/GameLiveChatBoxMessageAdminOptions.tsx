import { IGameChatMessage } from "@/models/game.models";
import ImageButton from "../common/ImageButton";
import { useAuthStore } from "@/stores/auth.stores";
import GameLiveChatBoxMessageAdminOptionsMuteModal from "./GameLiveChatBoxMessageAdminOptionsMuteModal";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { GameStoreContext } from "@/stores/games.stores";
import { useStore } from "zustand";


const GameLiveChatBoxMessageAdminOptions = (
  { message } : { message: IGameChatMessage }
) => {
  const {
    gameId,
  } = useParams<{ gameId: string }>();

  const {
    userId
  } = useAuthStore();

  const store = useContext(GameStoreContext);
  const setMuteUserModalOpen = useStore(store, (state) => state.setMuteUserModalOpen);

  if (userId === message.user.id) {
    return null;
  }

  return (
    <div className="bg-white rounded-full p-[16px] flex flex-col items-start gap-[24px]">
      <ImageButton
        className="text-black rounded-md text-[14px] lg:text-[16px]"
        aria-label="ban"
      >
        밴
      </ImageButton>
      <ImageButton
        className="text-black rounded-md text-[14px] lg:text-[16px]"
        aria-label="mute"
        onClick={() => setMuteUserModalOpen('md')}
      > 
        음소거
      </ImageButton>
      <GameLiveChatBoxMessageAdminOptionsMuteModal
        gameId={gameId}
        userId={message.user.id}
        username={message.user.username}
      />
    </div>
  );
};

export default GameLiveChatBoxMessageAdminOptions;