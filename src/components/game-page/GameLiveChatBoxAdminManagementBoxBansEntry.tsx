import ImageButton from "../common/ImageButton";
import { IChatBanEntry } from "@/models/admin.models";


interface IGameLiveChatBoxAdminManagementBoxBansEntryProps {
  ban: IChatBanEntry;
}

const GameLiveChatBoxAdminManagementBoxBansEntry = (
  { ban }: IGameLiveChatBoxAdminManagementBoxBansEntryProps
) => {
  return (
    <div className="flex items-center gap-[16px] py-[8px]" aria-label="ban-entry">
      <div className="flex flex-col gap-[16px] items-start w-[calc(100%-68px)]">
        <p className="text-white text-[14px] font-semibold" aria-label="username">{ban.user_data.username}</p>
        {/* Make a box with a full reason for the ban appear when the cursor hovers over the ban reason */}
        <p className="text-white text-[14px] line-clamp-1" aria-label="reason-for-ban">{ban.reason}</p>
      </div>
      <div>
        <ImageButton
          className="text-white bg-green-500 p-[8px] rounded-md text-[14px]"
          aria-label="unban"
        >
          해제
        </ImageButton>
      </div>
    </div>
  )
}

export default GameLiveChatBoxAdminManagementBoxBansEntry;