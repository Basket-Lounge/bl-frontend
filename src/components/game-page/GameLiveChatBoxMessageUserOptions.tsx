import { IGameChatMessage } from "@/models/game.models";
import { useAuthStore } from "@/stores/auth.stores";
import GameLiveChatBoxMessageOtherUserOptions from "./GameLiveChatBoxMessageOtherUserOptions";
import GameLiveChatBoxMessageMyOptions from "./GameLiveChatBoxMessageMyOptions";


const GameLiveChatBoxMessageUserOptions = (
  { message } : { message: IGameChatMessage }
) => {
  const {
    userId,
  } = useAuthStore();

  if (userId === message.user.id) {
    return <GameLiveChatBoxMessageMyOptions message={message} />;
  }

  return <GameLiveChatBoxMessageOtherUserOptions message={message} />;
};

export default GameLiveChatBoxMessageUserOptions;