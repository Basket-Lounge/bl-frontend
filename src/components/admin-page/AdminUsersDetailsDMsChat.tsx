import { sortUserChatMessagesByDate } from "@/utils/user.utils";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { UserChatMessageWithUserData } from "@/models/user.models";
import { useEffect, useState } from "react";
import { getUserChat } from "@/api/admin.api";
import AdminUsersDetailsDMsChatHistory from "./AdminUsersDetailsDMsChatHistory";
import AdminUsersDetailsDMsChatControlButtons from "./AdminUsersDetailsDMsChatControlButtons";


interface IAdminUsersDetailsDMsChatProps {
  userId: number;
  chatId: string;
}

const AdminUsersDetailsDMsChat = ({ userId, chatId }: IAdminUsersDetailsDMsChatProps) => {
  const [currentChatId, setCurrentChatId] = useState<string>(chatId);

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

  // useEffect(() => {
  //   if (chatId !== currentChatId) {
  //     setCurrentChatId(chatId);
  //     chatQuery.refetch();
  //   }
  // }, [chatId]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['admin', 'users', userId.toString(), "DMs", "chat", chatId]
      })
    }
  }, [chatId]);

  if (chatQuery.isRefetching || chatQuery.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-color3 rounded-md divide-y divide-white overflow-auto">
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
  )
}

export default AdminUsersDetailsDMsChat;