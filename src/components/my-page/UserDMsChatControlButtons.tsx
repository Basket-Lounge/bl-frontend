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
    <div className="flex items-center gap-[8px]">
      {/* a button to delete the chat */}
      <ImageButton
        onClick={handleDeleteChatClick}
        pending={deleteChatMutation.isPending}
        disabled={deleteChatMutation.isPending || blockChatMutation.isPending}
        size="large"
      >
        <Image
          src="/icons/delete_24dp_FFFFFF.svg"
          alt="delete"
          width={18}
          height={24}
          className="w-auto xl:h-[28px] w-[20px]"
        />
      </ImageButton>
      {/* a button to block a user */}
      <ImageButton
        onClick={handleBlockChatClick}
        pending={blockChatMutation.isPending}
        disabled={deleteChatMutation.isPending || blockChatMutation.isPending}
        size="large"
      >
        <Image
          src="/icons/block_24dp_FFFFFF.svg"
          alt="block"
          width={24}
          height={24}
          className="w-auto xl:h-[28px] w-[20px]"
        />
      </ImageButton>
    </div>
  )
}

export default UserDMsChatControlButtons;