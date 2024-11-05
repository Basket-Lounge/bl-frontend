import { getUserChat } from "@/api/user.api";
import { sortUserChatMessagesByDate } from "@/utils/user.utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import UserDMsChatInput from "./UserDMsChatInput";
import UserDMsChatHistory from "./UserDMsChatHistory";
import { UserChatMessageWithUserData } from "@/models/user.models";

interface IUserDMsChatProps {
  userId: number;
  closeChatCallback: () => void;
}

const UserDMsChat = ({ closeChatCallback, userId }: IUserDMsChatProps) => {
  const chatQuery = useSuspenseQuery({
    queryKey: ['my-page', "DMs", "chat", userId],
    queryFn: async () => {
      return await getUserChat(userId);
    }
  });

  const handleCloseChatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeChatCallback();
  }

  const handleDeleteChatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // delete chat
    closeChatCallback();
  }

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

  console.log(sortedMessages);

  return (
    <div className="bg-color3 rounded-md divide-y divide-white">
      <div className="p-[24px] flex justify-between items-center relative">
        <div className="flex gap-[24px]">
          <div className="flex w-[64px] h-[64px] bg-white rounded-full"></div>
          <div className="flex flex-col gap-[12px]">
            <p className="font-semibold text-[16px] line-clamp-1">{otherUser?.user_data.username}</p>
            <p className="text-[14px]">{chatQuery.data.updated_at}</p>
          </div>
        </div>
        <div className="flex items-center gap-[8px]">
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
          <button
            onClick={handleCloseChatClick}
          >
            <Image
              src="/icons/block_24dp_FFFFFF.svg"
              alt="close"
              width={24}
              height={24}
              className="w-auto h-[28px]"
            />
          </button>
          <button
            onClick={handleCloseChatClick}
          >
            <Image
              src="/icons/report_24dp_FFFFFF.svg"
              alt="close"
              width={24}
              height={24}
              className="w-auto h-[28px]"
            />
          </button>
        </div>
      </div>
      <UserDMsChatHistory messages={sortedMessages} />
      <div className="p-[24px]">
        <UserDMsChatInput />
      </div>
    </div>
  )
}

export default UserDMsChat;