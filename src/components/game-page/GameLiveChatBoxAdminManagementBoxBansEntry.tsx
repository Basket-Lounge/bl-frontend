import { useMutation, useQueryClient } from "@tanstack/react-query";
import ImageButton from "../common/ImageButton";
import { IChatBanEntry } from "@/models/admin.models";
import { updateUserBanInGameChat } from "@/api/admin.api";


interface IGameLiveChatBoxAdminManagementBoxBansEntryProps {
  ban: IChatBanEntry;
}

const GameLiveChatBoxAdminManagementBoxBansEntry = (
  { ban }: IGameLiveChatBoxAdminManagementBoxBansEntryProps
) => {
  const gameId = ban.chat_data.game_data.game_id;
  const queryClient = useQueryClient();
  const disableBanMutation = useMutation({
    mutationFn: () => {
      return updateUserBanInGameChat(
        gameId,
        ban.user_data.id,
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
          onClick={() => disableBanMutation.mutate()}
          disabled={disableBanMutation.isPending}
          pending={disableBanMutation.isPending}
          aria-disabled={disableBanMutation.isPending}
        >
          해제
        </ImageButton>
      </div>
    </div>
  )
}

export default GameLiveChatBoxAdminManagementBoxBansEntry;