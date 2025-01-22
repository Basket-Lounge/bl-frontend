'use client'

import { createUserChat } from "@/api/user.api";
import { useAuthStore } from "@/stores/auth.stores";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "zustand";


export default function UserHeaderChatButton() {
  const router = useRouter();
  const { userId } = useParams();
  const {
    isAuthenticated
  } = useStore(useAuthStore);


  const createChatMutation = useMutation({
    mutationFn: () => {
      return createUserChat(parseInt(userId as string));
    },
    onSuccess: () => {
      router.push(`/my-page/dms/`);
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    createChatMutation.mutate();
  }

  return (
    <button 
      className="bg-color3 rounded-lg text-[16px] p-[12px] font-medium flex gap-[12px] items-center"
      onClick={handleClick}
      disabled={createChatMutation.isPending || !isAuthenticated}
    >
      <Image
        src={"/icons/chat_24dp_FFFFFF.svg"}
        alt="chat"
        width={24}
        height={24}
      />
      {createChatMutation.isPending ?
        <span>채팅중...</span> :
        <span>채팅하기</span>
      }
    </button>
  )
}