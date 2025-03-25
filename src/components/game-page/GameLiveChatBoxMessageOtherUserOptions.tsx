import { IGameChatMessage } from "@/models/game.models";
import ImageButton from "../common/ImageButton";
import { useAuthStore } from "@/stores/auth.stores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockUnblockUser } from "@/api/user.api";
import { toast } from "react-toastify";
import { useMemo } from "react";


const GameLiveChatBoxMessageOtherUserOptions = (
  { message } : { message: IGameChatMessage }
) => {
  const {
    userId,
    userBlocklist
  } = useAuthStore();

  const queryClient = useQueryClient();
  const blockUserMutation = useMutation({
    mutationFn: () => {
      if (!message.user.id) {
        return Promise.reject("No user id");
      }

      if (userId === message.user.id) {
        return Promise.reject("Cannot block yourself");
      }

      return blockUnblockUser(message.user.id);
    },
    onSuccess: (data: number) => {
      if (data === 201) {
        queryClient.invalidateQueries({
          queryKey: ["blocklist"],
        });

        toast.success("사용자가 차단되었습니다.");
        return;
      }

      if (data === 200) {
        queryClient.invalidateQueries({
          queryKey: ["blocklist"],
        });

        toast.success("사용자가 차단 해제되었습니다.");
        return;
      }

      toast.error("사용자 차단에 실패했습니다. 다시 시도해주세요.");
    },
    onError: () => {
      toast.error("사용자 차단에 실패했습니다. 다시 시도해주세요.");
    }
  });

  const handleBlock = () => {
    blockUserMutation.mutate();
  };

  const isBlocked = useMemo(() => {
    if (!userBlocklist) {
      return false;
    }

    return userBlocklist.some((blockedUser) => blockedUser.id === message.user.id);
  }, [userBlocklist, message.user.id]);

  return (
    <div className="bg-white rounded-full p-[16px] flex flex-col items-start gap-[16px]">
      <ImageButton
        onClick={handleBlock}
        className="text-black rounded-md text-[14px] lg:text-[16px]"
        aria-label={isBlocked ? "unblock-user" : "block-user"}
        disabled={blockUserMutation.isPending}
        pending={blockUserMutation.isPending}
        aria-disabled={blockUserMutation.isPending}
      >
        {isBlocked ? "차단 해제" : "차단"}
      </ImageButton>
    </div>
  );
};

export default GameLiveChatBoxMessageOtherUserOptions;