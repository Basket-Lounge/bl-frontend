import { getUserChat } from "@/api/user.api";
import { useSuspenseQuery } from "@tanstack/react-query";
import UserDMsChatInput from "./UserDMsChatInput";
import UserDMsChatHistory from "./UserDMsChatHistory";
import { useEffect, useState } from "react";
import UserDMsChatHeader from "./UserDMsChatHeader";


interface IUserDMsChatProps {
  userId: number;
}

const UserDMsChat = ({ userId }: IUserDMsChatProps) => {
  const [currentUserId, setCurrentUserId] = useState<number>(userId);

  const chatQuery = useSuspenseQuery({
    queryKey: ['my-page', "DMs", "chat", userId],
    queryFn: async () => {
      return await getUserChat(userId);
    }
  });

  const otherUser = chatQuery.data.participants.find((participant) => participant.user_data.id === userId);
  const otherUserUsername = otherUser?.user_data.username || '';
  const otherUserfavTeamSymbol = otherUser?.user_data.favorite_team?.symbol || '';
  
  useEffect(() => {
    if (userId !== currentUserId) {
      setCurrentUserId(userId);
      chatQuery.refetch();
    }
  }, [userId]);

  return (
    <div className="bg-color3 rounded-md divide-y divide-white overflow-auto">
      <UserDMsChatHeader
        userId={userId}
        username={otherUserUsername}
        updatedAt={chatQuery.data.updated_at}
        userFavTeamSymbol={otherUserfavTeamSymbol}
      />
      <UserDMsChatHistory 
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