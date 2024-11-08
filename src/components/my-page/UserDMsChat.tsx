import { getUserChat } from "@/api/user.api";
import { sortUserChatMessagesByDate } from "@/utils/user.utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import UserDMsChatInput from "./UserDMsChatInput";
import UserDMsChatHistory from "./UserDMsChatHistory";
import { UserChatMessageWithUserData } from "@/models/user.models";
import UserDMsChatControlButtons from "./UserDMsChatControlButtons";

interface IUserDMsChatProps {
  userId: number;
}

const UserDMsChat = ({ userId }: IUserDMsChatProps) => {
  const chatQuery = useSuspenseQuery({
    queryKey: ['my-page', "DMs", "chat", userId],
    queryFn: async () => {
      return await getUserChat(userId);
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
        <UserDMsChatControlButtons userId={userId} />
      </div>
      <UserDMsChatHistory 
        messages={sortedMessages} 
        chatId={chatQuery.data.id}
        userId={userId}
      />
      <div className="p-[24px]">
        <UserDMsChatInput />
      </div>
    </div>
  )
}

export default UserDMsChat;