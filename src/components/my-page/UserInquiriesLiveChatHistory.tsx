import { UserChatMessageWithUserData } from "@/models/user.models";
import { useEffect, useRef, useState } from "react";
import { Centrifuge } from "centrifuge";
import { getConnectionToken, getSubscriptionTokenForLiveInquiryChat } from "@/api/webSocket.api";
import { useMutation } from "@tanstack/react-query";
import { markInquiryAsRead } from "@/api/user.api";
import useDebounce from "@/hooks/useDebounce";
import UserInquiriesLiveChatHistoryEntry from "./UserInquiriesLiveChatHistoryEntry";


interface IUserInquiriesLiveChatHistoryProps {
  messages: UserChatMessageWithUserData[];
  inquiryId: string;
}

const UserInquiriesLiveChatHistory = (
  { messages, inquiryId }: IUserInquiriesLiveChatHistoryProps
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const [sortedMessages, setSortedMessages] = useState<UserChatMessageWithUserData[]>(messages);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [connectionAttempt, setConnectionAttempt] = useState<number>(0);

  const markAsReadMutation = useMutation({
    mutationFn: async () => {
      return markInquiryAsRead(inquiryId);
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

    const subscription = client.newSubscription(`users/inquiries/${inquiryId}`, {
      getToken: async () => {
        const data = await getSubscriptionTokenForLiveInquiryChat(inquiryId);
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
      console.log("publication", ctx);
      if (ctx.data.type === "message") {
        setSortedMessages((prevMessages) => [...prevMessages, ctx.data]);
      }
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
        <p className="font-bold text-[24px]">
          (つ╥﹏╥)つ
        </p>
        <p className="font-bold text-[20px]">
          메시지가 없습니다.
        </p>
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
        <UserInquiriesLiveChatHistoryEntry key={message.id} message={message} />
      ))}
    </div>
  )
}

export default UserInquiriesLiveChatHistory;