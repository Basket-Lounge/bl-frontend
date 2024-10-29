import { IGameChatMessage } from "@/models/game.models";
import Image from "next/image";


const GameLiveChatBoxMessage = ({ message } : {message: IGameChatMessage}) => {
  return (
    <div className="flex gap-[24px] items-start">
      <Image
        src="/logos/lal.svg"
        alt="lal"
        width={48}
        height={48}
        className="w-[48px] h-[48px]"
      />
      <div className="flex flex-col gap-[8px]">
        <p className="text-white font-semibold">{message.user.username}</p>
        <p className="text-white">{message.message}</p>
      </div>
    </div>
  );
};

export default GameLiveChatBoxMessage;