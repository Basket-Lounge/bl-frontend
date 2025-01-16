import { InquiryMessage  } from "@/models/user.models";
import { timeAgoKorean } from "@/utils/common.utils";


interface IUserInquiriesLiveChatHistoryEntryProps {
  message: InquiryMessage;
}

const UserInquiriesLiveChatHistoryEntry = ({ message }: IUserInquiriesLiveChatHistoryEntryProps) => {
  const createdAt = timeAgoKorean(message.created_at);

  if (message.user_type === "Moderator") {
    return (
      <div className="flex gap-[16px] items-end">
        <div className="w-[48px] h-[48px] rounded-full bg-white"></div>
        <div className="flex flex-col gap-[8px] items-start w-2/3">
          <div className="flex flex-col gap-[12px] bg-color1 p-[16px] rounded-md">
            <p className="font-semibold text-[16px] text-white">{message.message}</p>
          </div>
          <p className="text-[14px]">{createdAt}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-[16px] flex-col items-end">
      <div className="flex flex-col gap-[8px] items-end w-2/3">
        <div className="flex flex-col gap-[12px] bg-color4 p-[16px] rounded-md">
          <p className="font-semibold text-[16px] line-clamp-1">{message.message}</p>
        </div>
        <p className="text-[14px]">{createdAt}</p>
      </div>
    </div>
  )
}

export default UserInquiriesLiveChatHistoryEntry;