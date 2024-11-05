'use client'

import { createUserChat, getUserChat } from "@/api/user.api";
import { useAuthStore } from "@/stores/auth.stores";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "zustand";


export default function UserHeaderChatButton() {
  const router = useRouter();
  const { userId } = useParams();
  const {
    isAuthenticated
  } = useStore(useAuthStore);

  const getChatQuery = useQuery({
    queryKey: ["users", userId as string, "chat"],
    queryFn: async () => {
      return await getUserChat(parseInt(userId as string));
    },
    enabled: false,
  });

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

    getChatQuery.refetch();
  }

  useEffect(() => {
    if (getChatQuery.status === "error") {
      createChatMutation.mutate();
    } else if (getChatQuery.status === "success") {
      router.push(`/my-page/dms/`);
    }

  }, [getChatQuery.status]);

  return (
    <button 
      className="bg-color3 rounded-lg text-[16px] p-[12px] font-medium flex gap-[12px] items-center"
      onClick={handleClick}
    >
      <Image
        src={"/icons/chat_24dp_FFFFFF.svg"}
        alt="chat"
        width={24}
        height={24}
      />
      {getChatQuery.isLoading || getChatQuery.isRefetching ?
        <span>채팅중...</span> :
        <span>채팅하기</span>
      }
    </button>
  )
}