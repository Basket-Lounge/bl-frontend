import { IGameChatMessage } from "@/models/game.models";
import Image from "next/image";
import DropdownButton from "../common/DropdownButton";
import { useAuthStore } from "@/stores/auth.stores";
import GameLiveChatBoxMessageUserOptions from "./GameLiveChatBoxMessageUserOptions";
import GameLiveChatBoxMessageAdminOptions from "./GameLiveChatBoxMessageAdminOptions";


const GameLiveChatBoxMessage = (
  { message } : { message: IGameChatMessage }
) => {
  const {
    userId,
    userRole
  } = useAuthStore();

  return (
    <div className="flex gap-[16px] lg:gap-[24px] items-start w-full" aria-label="message">
      { message.user.favorite_team ? (
        <div className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] relative">
          <Image
            className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
            src={'/logos/' + message.user.favorite_team + '.svg'}
            alt={"team-logo" + message.user.favorite_team}
            width={20}
            height={20}
          />
        </div>
      ) : (
        <div className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] rounded-full bg-white relative">
          <div 
            className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center font-semibold text-[16px] text-color1"
            aria-label="user-initial"
          >
            {message.user.username.slice(0, 1) || 'U'}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-[8px] overflow-hidden w-[calc(100%-56px)] lg:w-[calc(100%-72px)]">
        <DropdownButton
          emptyStyle={true}
          aria-label="post-actions"
        >
          <span className="text-white font-semibold text-[14px] lg:text-[16px]" aria-label="username">{message.user.username}</span>
          {(typeof userRole === 'number' && userRole <= 3) ? (
            <GameLiveChatBoxMessageAdminOptions message={message} />
          ) : (
            <GameLiveChatBoxMessageUserOptions message={message} />
          )}
        </DropdownButton>
        <p className="text-white leading-6 text-[14px] lg:text-[16px] break-words" aria-label="message-content">{message.message}</p>
      </div>
    </div>
  );
};

export default GameLiveChatBoxMessage;