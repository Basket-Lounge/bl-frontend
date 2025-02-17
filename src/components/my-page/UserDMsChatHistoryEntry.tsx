import { UserChatMessageWithUserData } from "@/models/user.models";
import { timeAgoKorean } from "@/utils/common.utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";


interface IUserDMsChatHistoryEntryProps {
  message: UserChatMessageWithUserData
}

const UserDMsChatHistoryEntry = ({ message }: IUserDMsChatHistoryEntryProps) => {
  const searchParams = useSearchParams();
  const userId = parseInt(searchParams.get("user") || '1');

  const createdAt = timeAgoKorean(message.created_at);
  const username = message.user_data.username;
  const userFavTeamSymbol = message.user_data.favorite_team?.symbol.toLowerCase();

  if (message.user_data.id === userId) {
    return (
      <div className="flex gap-[16px] items-end" aria-label="chat-history-entry-by-other-user">
        {userFavTeamSymbol ? (
          <div 
            className="w-[32px] h-[32px] xl:w-[48px] xl:h-[48px] bg-transparent rounded-full relative text-black"
            aria-label="user-favorite-team-logo"
          >
            <Image
              className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
              src={'/logos/' + userFavTeamSymbol + '.svg'} 
              alt="team-logo"
              width={20}
              height={20}
            />
          </div>
        ) : (
          <div 
            className="w-[32px] h-[32px] xl:w-[48px] xl:h-[48px] bg-white rounded-full relative"
            aria-label="user-initial"
          >
            <div className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center font-semibold text-[16px] text-color1">
              {username.slice(0, 1) || 'U'}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-[8px] items-start xl:w-[calc(100%-64px)] w-[calc(100%-48px)]">
          <div className="flex flex-col gap-[12px] bg-color1 p-[16px] rounded-md max-w-[calc(90%)]" aria-label="chat-message">
            <p className="text-[14px] xl:text-[16px] text-white break-words">{message.message}</p>
          </div>
          <p className="text-[14px]" aria-label="message-created-at">{createdAt}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-[16px] flex-col items-end" aria-label="chat-history-entry-by-you">
      <div className="flex flex-col gap-[8px] items-end w-[calc(100%)]">
        <div className="flex flex-col gap-[12px] bg-color4 p-[16px] rounded-md max-w-[calc(90%)] word-break" aria-label="chat-message">
          <p className="text-[14px] xl:text-[16px] break-words">{message.message}</p>
        </div>
        <p className="text-[14px] text-color3" aria-label="message-created-at">{createdAt}</p>
      </div>
    </div>
  )
}

export default UserDMsChatHistoryEntry;