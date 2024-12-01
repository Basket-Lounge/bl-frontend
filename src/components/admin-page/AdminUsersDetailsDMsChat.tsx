import { sortUserChatMessagesByDate } from "@/utils/user.utils";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { UserChatMessageWithUserData } from "@/models/user.models";
import { useCallback, useEffect } from "react";
import { getUserChat } from "@/api/admin.api";
import AdminUsersDetailsDMsChatHistory from "./AdminUsersDetailsDMsChatHistory";
import AdminUsersDetailsDMsChatControlButtons from "./AdminUsersDetailsDMsChatControlButtons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import SpinnerLoading from "../common/SpinnerLoading";


interface IAdminUsersDetailsDMsChatProps {
  userId: number;
  chatId: string;
}

const AdminUsersDetailsDMsChat = (
  { userId, chatId }: IAdminUsersDetailsDMsChatProps
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('chat');

    return params.toString()
  }, [searchParams])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(pathname + '?' + createQueryString());
    router.push(pathname +  '?' + createQueryString());
  }

  const queryClient = useQueryClient();
  const chatQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', userId.toString(), "DMs", "chat", chatId],
    queryFn: async () => {
      return await getUserChat(userId, chatId);
    }
  });

  const otherUser = chatQuery.data.participants.find((participant) => participant.user_data.id === userId);
  const otherUserMessages : UserChatMessageWithUserData[] = otherUser?.messages?.map((message) => {
    return {
      ...message,
      user_data: otherUser.user_data
    }
  }) || [];
  
  const user = chatQuery.data.participants.find((participant) => participant.user_data.id !== userId);
  const userMessages : UserChatMessageWithUserData[] = user?.messages?.map((message) => {
    return {
      ...message,
      user_data: user.user_data
    }
  }) || [];

  const messages = userMessages.concat(otherUserMessages || []) || []
  const sortedMessages = sortUserChatMessagesByDate(messages);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['admin', 'users', userId.toString(), "DMs", "chat", chatId]
      })
    }
  }, [chatId]);

  if (chatQuery.isRefetching || chatQuery.isLoading) {
    return <SpinnerLoading />
  }

  return (
    <div className="bg-color3 rounded-md overflow-auto relative">
      <button
        onClick={handleClick}
        className="absolute top-0 right-0 p-[8px] text-white z-10"
      >
        <Image
          src="/icons/close_24dp_FFFFFF.svg"
          alt="close"
          width={24}
          height={24}
        />
      </button>
      <div className="divide-y divide-white">
        <div className="p-[24px] flex justify-between items-center relative">
          <div className="flex gap-[24px]">
            <div className="flex w-[64px] h-[64px] bg-white rounded-full"></div>
            <div className="flex flex-col gap-[12px]">
              <p className="font-semibold text-[16px] line-clamp-1">{otherUser?.user_data.username}</p>
              <p className="text-[14px]">{chatQuery.data.updated_at}</p>
            </div>
          </div>
          <AdminUsersDetailsDMsChatControlButtons userId={userId} />
        </div>
        <AdminUsersDetailsDMsChatHistory
          messages={sortedMessages} 
        />
      </div>
    </div>
  )
}

export default AdminUsersDetailsDMsChat;