import { IGameChatMessage } from "@/models/game.models";
import ImageButton from "../common/ImageButton";
import { useAuthStore } from "@/stores/auth.stores";


const GameLiveChatBoxMessageUserOptions = (
  { message } : { message: IGameChatMessage }
) => {
  const {
    userId
  } = useAuthStore();

  if (userId === message.user.id) {
    return null
  }

  return (
    <div className="bg-white rounded-full p-[16px] flex flex-col items-start gap-[16px]">
      <ImageButton
        className="text-black rounded-md text-[14px] lg:text-[16px] font-semibold"
        aria-label="block"
      >
        차단
      </ImageButton>
    </div>
  );
};

export default GameLiveChatBoxMessageUserOptions;