import { InquiryMessage  } from "@/models/user.models";
import { timeAgoKorean } from "@/utils/common.utils";
import Image from "next/image";


interface IUserInquiriesLiveChatHistoryEntryProps {
  message: InquiryMessage;
}

const UserInquiriesLiveChatHistoryEntry = ({ message }: IUserInquiriesLiveChatHistoryEntryProps) => {
  const createdAt = timeAgoKorean(message.created_at);

  if (message.user_type === "Moderator") {
    return (
      <div className="flex gap-[16px] items-end">
        {message.user_favorite_team ? (
          <div className="w-[32px] h-[32px] xl:w-[48px] xl:h-[48px] bg-transparent rounded-full relative text-black">
            <Image
              className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
              src={'/logos/' + message.user_favorite_team.symbol.toLowerCase() + '.svg'} 
              alt="team-logo"
              width={20}
              height={20}
            />
          </div>
        ) : (
          <div className="w-[32px] h-[32px] xl:w-[48px] xl:h-[48px]] bg-white rounded-full relative">
            <div className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center font-semibold text-[16px] text-color1">
              {message.user_username.slice(0, 1) || 'U'}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-[8px] items-start xl:w-[calc(100%-64px)] w-[calc(100%-48px)]">
          <div className="flex flex-col gap-[12px] bg-color1 p-[16px] rounded-md max-w-[calc(90%)]">
            <p className="text-[14px] xl:text-[16px] text-white break-words">{message.message}</p>
          </div>
          <p className="text-[14px]">{createdAt}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-[16px] flex-col items-end">
      <div className="flex flex-col gap-[8px] items-end w-[calc(100%)]">
        <div className="flex flex-col gap-[12px] bg-color4 p-[16px] rounded-md max-w-[calc(90%)] word-break">
          <p className="text-[14px] xl:text-[16px] break-words">{message.message}</p>
        </div>
        <p className="text-[14px]">{createdAt}</p>
      </div>
    </div>
  )
}

export default UserInquiriesLiveChatHistoryEntry;