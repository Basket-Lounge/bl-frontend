import { UserChatMessageWithUserData } from "@/models/user.models";
import UserDMsChatHistoryEntry from "./UserDMsChatHistoryEntry";
import { useEffect, useRef, useState } from "react";
import { Centrifuge } from "centrifuge";
import { getConnectionToken, getSubscriptionTokenForLiveUserChat } from "@/api/webSocket.api";
import { useMutation } from "@tanstack/react-query";
import { markChatAsRead } from "@/api/user.api";
import useDebounce from "@/hooks/useDebounce";
import CuteErrorMessage from "../common/CuteErrorMessage";


interface IUserDMsChatHistoryProps {
  messages: UserChatMessageWithUserData[];
  chatId: string;
  userId: number;
}

const UserDMsChatHistory = ({ messages, chatId, userId }: IUserDMsChatHistoryProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const [sortedMessages, setSortedMessages] = useState<UserChatMessageWithUserData[]>(messages);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [connectionAttempt, setConnectionAttempt] = useState<number>(0);

  const markAsReadMutation = useMutation({
    mutationFn: async () => {
      return markChatAsRead(userId);
    }
  });

  const markAsReadDebounceCallback = useDebounce(() => {
    markAsReadMutation.mutate();
  }, 5000);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    markAsReadDebounceCallback();
  }

  useEffect(() => {
    const client = new Centrifuge(`${process.env.NEXT_PUBLIC_CENTRIFUGO_SERVER_WS_URL}/connection/websocket`, {
      getToken: async () => {
        const data = await getConnectionToken();
        return data.token;
      }
    });
    client.on('connecting', (ctx) => {
      setIsLoading(true);
      setConnected(false);
      setError(null);
    });
    client.on("error", (ctx) => {
      setIsLoading(false);
      setError("웹소켓 연결 중 오류가 발생했습니다.");
    });

    const subscription = client.newSubscription(`users/chats/${chatId}`, {
      getToken: async () => {
        const data = await getSubscriptionTokenForLiveUserChat(chatId);
        return data.token;
      }
    });
    subscription.on("subscribed", (ctx) => {
      setIsLoading(false);
      setConnected(true);
    });
    subscription.on("error", (ctx) => {
      setIsLoading(false);
      setError("해당 채널에 접속할 수 없습니다.");
    });
    subscription.on("join", (ctx) => {
      console.log(ctx);
    });
    subscription.on("publication", (ctx) => {
      console.log(ctx);
      setSortedMessages((prevMessages) => [...prevMessages, ctx.data]);
    });

    subscription.subscribe();
    client.connect();

    return () => {
      subscription.unsubscribe();
      client.disconnect();
    }
  }, [connectionAttempt]);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }
  }, [sortedMessages]);

  if (isLoading) {
    return (
      <div className="h-[500px] flex flex-col items-center justify-center gap-[16px]">
        <p className="font-bold text-[20px]">
          채팅 연결 중...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[500px] flex flex-col items-center justify-center gap-[16px]">
        <p className="font-bold text-[20px]">
          {error}
        </p>
      </div>
    );
  }

  if (sortedMessages.length === 0) {
    return (
      <div className="h-[500px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage error="메시지가 없습니다." />
      </div>
    );
  }

  return (
    <div 
      className="p-[24px] flex flex-col items-stretch gap-[24px] h-[500px] overflow-auto"
      ref={elementRef}
      onClick={handleClick}
    >
      {sortedMessages.map((message) => (
        <UserDMsChatHistoryEntry key={message.id} message={message} />
      ))}
    </div>
  )
}

export default UserDMsChatHistory;