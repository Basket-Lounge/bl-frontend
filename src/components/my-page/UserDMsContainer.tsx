import { UserChat } from "@/models/user.models";
import UserDMsContainerItem from "./UserDMsContainerItem";
import { useEffect, useState } from "react";
import { Centrifuge } from "centrifuge";
import { getConnectionToken, getSubscriptionTokenForLiveChatUpdate } from "@/api/webSocket.api";
import { useAuthStore } from "@/stores/auth.stores";
import { sortUserChatByLastMessageDate } from "@/utils/user.utils";
import { useQueryClient } from "@tanstack/react-query";
import CuteErrorMessage from "../common/CuteErrorMessage";


interface IUserDMsContainerProps {
  chats: UserChat[];
}

const UserDMsContainer = ({ chats }: IUserDMsContainerProps) => {
  const [realChats, setRealChats] = useState<UserChat[]>(chats);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionAttempt] = useState<number>(0);

  const {
    userId
  } = useAuthStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    setRealChats(chats);
  }, [chats]);

  useEffect(() => {
    const client = new Centrifuge(`${process.env.NEXT_PUBLIC_CENTRIFUGO_SERVER_WS_URL}/connection/websocket`, {
      getToken: async () => {
        const data = await getConnectionToken();
        return data.token;
      }
    });
    client.on('connecting', () => {
      setIsLoading(true);
      setConnected(false);
      setError(null);
    });
    client.on("error", () => {
      setIsLoading(false);
      setConnected(false);
      setError("웹소켓 연결 중 오류가 발생했습니다.");
    });

    const subscription = client.newSubscription(`users/${userId}/chats/updates`, {
      getToken: async () => {
        const data = await getSubscriptionTokenForLiveChatUpdate();
        return data.token;
      }
    });
    subscription.on("subscribed", () => {
      setIsLoading(false);
      setConnected(true);
      setError(null);
    });
    subscription.on("error", () => {
      setIsLoading(false);
      setConnected(false);
      setError("해당 채널에 접속할 수 없습니다.");
    });
    subscription.on("publication", (ctx) => {
      queryClient.removeQueries({
        queryKey: ['my-page', "DMs", "pagination"],
      });
      const sortedChatList = sortUserChatByLastMessageDate(
        realChats, 
        ctx.data, 
      );
      setRealChats(() => [...sortedChatList]);
    });

    subscription.subscribe();
    client.connect();

    return () => {
      subscription.unsubscribe();
      client.disconnect();
    }
  }, [connectionAttempt]);

  if (realChats.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage error="채팅 목록이 없습니다." />
      </div>
    );
  }

  return (
    <div className="gap-[24px] items-stretch flex flex-col">
      {realChats.map((chat) => (
        <UserDMsContainerItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
}

export default UserDMsContainer;