import { UserChatMessage, UserChatMessageWithUserData } from "@/models/user.models";
import { useSearchParams } from "next/navigation";


interface IUserDMsChatHistoryEntryProps {
  message: UserChatMessageWithUserData
}

const UserDMsChatHistoryEntry = ({ message }: IUserDMsChatHistoryEntryProps) => {
  const searchParams = useSearchParams();
  const userId = parseInt(searchParams.get("user") || '1');

  if (message.user_data.id === userId) {
    return (
      <div className="flex gap-[16px] items-end">
        <div className="w-[48px] h-[48px] rounded-full bg-white"></div>
        <div className="flex flex-col gap-[8px] items-start w-2/3">
          <div className="flex flex-col gap-[12px] bg-color1 p-[16px] rounded-md">
            <p className="font-semibold text-[16px] text-white">{message.message}</p>
          </div>
          <p className="text-[14px]">{message.created_at}</p>
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
        <p className="text-[14px]">{message.created_at}</p>
      </div>
    </div>
  )
}

export default UserDMsChatHistoryEntry;