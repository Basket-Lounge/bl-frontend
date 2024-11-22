import { blockUserChat, deleteUserChat } from "@/api/user.api";
import { MyPageStoreContext } from "@/app/my-page/layout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useContext } from "react";
import { useStore } from "zustand";


interface IAdminUsersDetailsDMsChatControlButtonsProps {
  userId: number;
}

const AdminUsersDetailsDMsChatControlButtons = ({ userId }: IAdminUsersDetailsDMsChatControlButtonsProps) => {
  const store = useContext(MyPageStoreContext);
  const setChatDeleted = useStore(store, (state) => state.setChatDeleted);

  const deleteChatMutation = useMutation({
    mutationFn: () => {
      return deleteUserChat(userId);
    },
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['my-page', "DMs", "chat", userId]
      })
      setChatDeleted(true);
    }
  });

  const blockChatMutation = useMutation({
    mutationFn: () => {
      return blockUserChat(userId);
    },
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['my-page', "DMs", "chat", userId]
      })
      setChatDeleted(true);
    }
  });

  const queryClient = useQueryClient();
  const handleBlockChatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    queryClient.removeQueries({
      queryKey: ['my-page', "DMs", "chat", userId]
    })
    blockChatMutation.mutate();
  }

  const handleDeleteChatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    queryClient.removeQueries({
      queryKey: ['my-page', "DMs", "chat", userId]
    })
    deleteChatMutation.mutate();
  }

  if (deleteChatMutation.isPending) {
    return <div>채팅 삭제중...</div>
  }

  return (
    <div className="flex items-center gap-[8px]">
      {/* a button to delete the chat */}
      <button
        onClick={handleDeleteChatClick}
      >
        <Image
          src="/icons/delete_24dp_FFFFFF.svg"
          alt="delete"
          width={18}
          height={24}
          className="w-auto h-[28px]"
        />
      </button>
      {/* a button to block a user */}
      <button
        onClick={handleBlockChatClick}
      >
        <Image
          src="/icons/block_24dp_FFFFFF.svg"
          alt="close"
          width={24}
          height={24}
          className="w-auto h-[28px]"
        />
      </button>
    </div>
  )
}

export default AdminUsersDetailsDMsChatControlButtons;