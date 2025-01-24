import { InquiryMessage, UserInquiryWithUserData } from "@/models/user.models";
import { useEffect, useMemo, useRef, useState } from "react";
import { Centrifuge } from "centrifuge";
import { getConnectionToken, getSubscriptionTokenForLiveAdminInquiryChat } from "@/api/webSocket.api";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import AdminInquiriesLiveChatHistoryEntry from "./AdminInquiriesLiveChatHistoryEntry";
import CuteErrorMessage from "../common/CuteErrorMessage";
import { getInquiryMessages, markInquiryAsRead } from "@/api/admin.api";
import { sortInquiryMessagesByDate } from "@/utils/user.utils";
import RegularButton from "../common/RegularButton";
import { toast } from "react-toastify";
import SpinnerLoading from "../common/SpinnerLoading";


interface IAdminInquiriesLiveChatHistoryProps {
  inquiryId: string;
  updateInquiryState: (inquiry: UserInquiryWithUserData) => void;
  updateInquiryModerator: (inquiry: UserInquiryWithUserData) => void;
  solved: boolean;
}

const AdminInquiriesLiveChatHistory = ({ 
  inquiryId, 
  updateInquiryModerator, 
  updateInquiryState,
  solved
}: IAdminInquiriesLiveChatHistoryProps ) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const [sortedNewMessages, setSortedMessages] = useState<InquiryMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [connectionAttempt, setConnectionAttempt] = useState<number>(0);

  const inquiryMessagesQuery = useInfiniteQuery({
    queryKey: ['admin', 'inquiries', 'chat', inquiryId, 'messages'],
    queryFn: async ({ pageParam = "" }) => {
      return await getInquiryMessages(inquiryId, pageParam);
    }, 
    getNextPageParam: (lastPage) => {
      if (lastPage.next == null) {
        return undefined;
      }

      const myURL = new URL(lastPage.next);
      const cursor = myURL.searchParams.get('cursor');
      return cursor;
    },
    initialPageParam: ""
  });

  const sortedOldMessages = useMemo(() => {
    return sortInquiryMessagesByDate(inquiryMessagesQuery.data?.pages.map((page) => page.results).flat() || []);
  }, [inquiryMessagesQuery.data]);

  const markAsReadMutation = useMutation({
    mutationFn: async () => {
      return markInquiryAsRead(inquiryId);
    }
  });

  const markAsReadDebounceCallback = useDebounce(() => {
    markAsReadMutation.mutate();
  }, 5000);

  const loadPreviousMessages = useDebounce(() => {
    inquiryMessagesQuery.fetchNextPage();
  }, 300);

  const handleClick = () => {
    markAsReadDebounceCallback();
  }

  const handleScroll = (e: Event) => {
    const element = e.target as HTMLDivElement;
    if (element.scrollTop === 0) {
      loadPreviousMessages();
    }
  }

  const handleRetryClick = () => {
    setConnectionAttempt(connectionAttempt + 1);
  }

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
      setError("채팅 연결 중 오류가 발생했습니다.");
      toast.error("채팅 연결 중 오류가 발생했습니다.");
    });

    const subscription = client.newSubscription(`users/inquiries/${inquiryId}`, {
      getToken: async () => {
        const data = await getSubscriptionTokenForLiveAdminInquiryChat(inquiryId);
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
      toast.error("해당 채널에 접속할 수 없습니다. 다시 시도해주세요.");
    });
    subscription.on("publication", (ctx) => {
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
  }, [connectionAttempt, inquiryId]);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }
  }, [sortedNewMessages]);

  useEffect(() => {
    // run after 5 seconds to ensure that the elementRef is not null
    const timeout = setTimeout(() => {
      elementRef.current?.addEventListener("scroll", handleScroll);
    }, 5000);
    
    return () => {
      clearTimeout(timeout);
      elementRef.current?.removeEventListener("scroll", handleScroll);
    }
  }, [inquiryMessagesQuery.dataUpdatedAt]);

  if (isLoading) {
    return (
      <SpinnerLoading />
    );
  }

  if (error || connected === false) {
    return (
      <div className="h-[500px] flex flex-col items-center justify-center gap-[16px]">
        <p className="font-bold text-[20px]">
          {error}
        </p>
        <RegularButton
          onClick={handleRetryClick}
        >
          다시 시도
        </RegularButton>
      </div>
    );
  }

  if (sortedNewMessages.length === 0 && sortedOldMessages.length === 0) {
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
      {sortedOldMessages.map((message) => (
        <AdminInquiriesLiveChatHistoryEntry key={message.id} message={message} />
      ))}
      {sortedNewMessages.map((message) => (
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