import { IGameChatMessage } from "@/models/game.models";
import Image from "next/image";


const GameLiveChatBoxMessage = (
  { message } : {message: IGameChatMessage}
) => {
  return (
    <div className="flex gap-[16px] lg:gap-[24px] items-start w-full">
      <Image
        src="/logos/lal.svg"
        alt="lal"
        width={48}
        height={48}
        className="w-[40px] lg:w-[48px] h-auto"
      />
      <div className="flex flex-col gap-[8px] overflow-hidden">
        <p className="text-white font-semibold text-[16px]">{message.user.username}</p>
        <p className="text-white leading-6 text-[16px] break-words">{message.message}</p>
      </div>
    </div>
  );
};

export default GameLiveChatBoxMessage;