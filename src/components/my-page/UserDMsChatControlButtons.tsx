import { blockUserChat, deleteUserChat } from "@/api/user.api";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useContext } from "react";
import { useStore } from "zustand";
import ImageButton from "../common/ImageButton";


interface IUserDMsChatControlButtonsProps {
  userId: number;
}

const UserDMsChatControlButtons = ({ userId }: IUserDMsChatControlButtonsProps) => {
  const store = useContext(MyPageStoreContext);
  const setChatDeleted = useStore(store, (state) => state.setChatDeleted);

  const deleteChatMutation = useMutation({
    mutationFn: () => {
      return deleteUserChat(userId);
    },
    onSuccess: () => {
      setChatDeleted(true);
    }
  });

  const blockChatMutation = useMutation({
    mutationFn: () => {
      return blockUserChat(userId);
    },
    onSuccess: () => {
      setChatDeleted(true);
    }
  });

  const handleBlockChatClick = () => {
    blockChatMutation.mutate();
  }

  const handleDeleteChatClick = () => {
    deleteChatMutation.mutate();
  }

  return (
    <div className="flex items-center gap-[16px]" aria-label="chat-control-buttons">
      {/* a button to delete the chat */}
      <ImageButton
        aria-label="delete-chat"
        aria-disabled={deleteChatMutation.isPending || blockChatMutation.isPending}
        onClick={handleDeleteChatClick}
        pending={deleteChatMutation.isPending}
        disabled={deleteChatMutation.isPending || blockChatMutation.isPending}
        size="large"
      >
        <Image
          src="/icons/delete_24dp_FFFFFF.svg"
          alt="delete"
          width={20}
          height={28}
          className="xl:h-[28px] w-[24px] h-[24px] xl:w-[28px]"
        />
      </ImageButton>
      {/* a button to block a user */}
      <ImageButton
        aria-label="block-user"
        aria-disabled={blockChatMutation.isPending || deleteChatMutation.isPending}
        onClick={handleBlockChatClick}
        pending={blockChatMutation.isPending}
        disabled={deleteChatMutation.isPending || blockChatMutation.isPending}
        size="large"
      >
        <Image
          src="/icons/block_24dp_FFFFFF.svg"
          alt="block"
          width={24}
          height={28}
          className="xl:h-[28px] w-[24px] h-[24px] xl:w-[28px]"
        />
      </ImageButton>
    </div>
  )
}

export default UserDMsChatControlButtons;