import { IGameChatMessage } from "@/models/game.models";
import { useAuthStore } from "@/stores/auth.stores";
import GameLiveChatBoxMessageAdminOptionsMuteModal from "./GameLiveChatBoxMessageAdminOptionsMuteModal";
import { useParams } from "next/navigation";
import GameLiveChatBoxMessageAdminOptionsMuteButton from "./GameLiveChatBoxMessageAdminOptionsMuteButton";
import GameLiveChatBoxMessageAdminOptionsBanButton from "./GameLiveChatBoxMessageAdminOptionsBanButton";
import GameLiveChatBoxMessageAdminOptionsBanModal from "./GameLiveChatBoxMessageAdminOptionsBanModal";


const GameLiveChatBoxMessageAdminOptions = (
  { message } : { message: IGameChatMessage }
) => {
  const { gameId } = useParams<{ gameId: string }>();
  const { userId } = useAuthStore();

  if (userId === message.user.id) {
    return null;
  }

  return (
    <div className="bg-white rounded-full p-[16px] flex flex-col items-start gap-[24px]">
      <GameLiveChatBoxMessageAdminOptionsBanButton message={message} />
      <GameLiveChatBoxMessageAdminOptionsMuteButton message={message} />
      <GameLiveChatBoxMessageAdminOptionsMuteModal
        gameId={gameId}
        userId={message.user.id}
        username={message.user.username}
        messageId={message.id}
      />
      <GameLiveChatBoxMessageAdminOptionsBanModal
        gameId={gameId}
        userId={message.user.id}
        username={message.user.username}
        messageId={message.id}
      />
    </div>
  );
};

export default GameLiveChatBoxMessageAdminOptions;