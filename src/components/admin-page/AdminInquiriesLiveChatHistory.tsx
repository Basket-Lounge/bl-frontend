import { UserChatMessageWithUserData, UserInquiryWithUserData } from "@/models/user.models";
import { useEffect, useRef, useState } from "react";
import { Centrifuge } from "centrifuge";
import { getConnectionToken, getSubscriptionTokenForLiveAdminInquiryChat } from "@/api/webSocket.api";
import { useMutation } from "@tanstack/react-query";
import { markInquiryAsRead } from "@/api/user.api";
import useDebounce from "@/hooks/useDebounce";
import AdminInquiriesLiveChatHistoryEntry from "./AdminInquiriesLiveChatHistoryEntry";
import CuteErrorMessage from "../common/CuteErrorMessage";


interface IAdminInquiriesLiveChatHistoryProps {
  messages: UserChatMessageWithUserData[];
  inquiryId: string;
  updateInquiryState: (inquiry: UserInquiryWithUserData) => void;
  updateInquiryModerator: (inquiry: UserInquiryWithUserData) => void;
  solved: boolean;
}

const AdminInquiriesLiveChatHistory = ({ 
  messages, 
  inquiryId, 
  updateInquiryModerator, 
  updateInquiryState,
  solved
}: IAdminInquiriesLiveChatHistoryProps ) => {
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

  const handleRetryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setConnectionAttempt(connectionAttempt + 1);
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
      console.log(ctx);
      setIsLoading(false);
      setError("웹소켓 연결 중 오류가 발생했습니다.");
    });

    const subscription = client.newSubscription(`users/inquiries/${inquiryId}`, {
      getToken: async () => {
        const data = await getSubscriptionTokenForLiveAdminInquiryChat(inquiryId);
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
    subscription.on("publication", (ctx) => {
      console.log(ctx);
      if (ctx.data.type === "message") {
        setSortedMessages((prevMessages) => [...prevMessages, ctx.data.message]);
      } else if (ctx.data.type.includes("moderator")) {
        updateInquiryModerator(ctx.data.inquiry);
      } else if (ctx.data.type === "inquiry_state_update") {
        updateInquiryState(ctx.data.inquiry);
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
        <button 
          className="bg-color1 text-white rounded-md py-[8px] px-[16px] font-bold"
          onClick={handleRetryClick}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (sortedMessages.length === 0) {
    return (
      <div className="h-[500px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage
          error="메시지가 없습니다."
        />
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
        <AdminInquiriesLiveChatHistoryEntry key={message.id} message={message} />
      ))}
      { solved && (
        <div className="w-full py-[8px] bg-[#16A34A] rounded-full text-center">
          <span>문의가 해결되었습니다.</span>
        </div>
      )}
    </div>
  )
}

export default AdminInquiriesLiveChatHistory;