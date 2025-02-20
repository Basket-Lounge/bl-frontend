import ImageButton from "../common/ImageButton";
import { IChatMuteEntry } from "@/models/admin.models";


interface IGameLiveChatBoxAdminManagementBoxMutesEntryProps {
  mute: IChatMuteEntry;
}

const GameLiveChatBoxAdminManagementBoxMutesEntry = (
  { mute }: IGameLiveChatBoxAdminManagementBoxMutesEntryProps
) => {
  return (
    <div className="flex items-center gap-[16px] py-[8px]">
      <div className="flex flex-col gap-[16px] items-start w-[calc(100%-68px)]">
        <p className="text-white text-[14px] font-semibold">{mute.user_data.username}</p>
        <p className="text-white text-[14px]">{mute.reason}</p>
        <p className="text-white text-[14px]">{mute.mute_until}</p>
      </div>
      <div>
        <ImageButton
          className="text-white bg-green-500 p-[8px] rounded-md text-[14px]"
        >
          해제
        </ImageButton>
      </div>
    </div>
  )
}

export default GameLiveChatBoxAdminManagementBoxMutesEntry;