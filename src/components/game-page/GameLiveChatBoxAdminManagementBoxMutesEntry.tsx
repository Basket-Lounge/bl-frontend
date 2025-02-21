import { timeAgoKorean, timeUntilKorean } from "@/utils/common.utils";
import ImageButton from "../common/ImageButton";
import { IChatMuteEntry } from "@/models/admin.models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { muteUserInGameChat } from "@/api/admin.api";


interface IGameLiveChatBoxAdminManagementBoxMutesEntryProps {
  mute: IChatMuteEntry;
}

const GameLiveChatBoxAdminManagementBoxMutesEntry = (
  { mute }: IGameLiveChatBoxAdminManagementBoxMutesEntryProps
) => {
  const gameId = mute.chat_data.game_data.game_id;

  const queryClient = useQueryClient();
  const disableMuteMutation = useMutation({
    mutationFn: () => {
      return muteUserInGameChat(
        gameId,
        mute.user_data.id,
        false,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["game", gameId , "chat-blacklist"],
      });
    }
  });

  return (
    <div className="flex items-center gap-[16px] py-[8px]">
      <div className="flex flex-col gap-[16px] items-start w-[calc(100%-68px)]">
        <p className="text-white text-[14px] font-semibold">{mute.user_data.username}</p>
        <p className="text-white text-[14px]">{mute.reason}</p>
        <p className="text-white text-[14px]">{mute.mute_until ? timeUntilKorean(mute.mute_until) : '영구 음소거'}</p>
      </div>
      <div>
        <ImageButton
          className="text-white bg-green-500 p-[8px] rounded-md text-[14px]"
          aria-label="unmute"
          onClick={() => disableMuteMutation.mutate()}
          disabled={disableMuteMutation.isPending}
          pending={disableMuteMutation.isPending}
          aria-disabled={disableMuteMutation.isPending}
        >
          해제
        </ImageButton>
      </div>
    </div>
  )
}

export default GameLiveChatBoxAdminManagementBoxMutesEntry;