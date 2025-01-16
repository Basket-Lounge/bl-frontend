import { InquiryMessage } from "@/models/user.models";
import { useEffect, useMemo, useRef, useState } from "react";
import { Centrifuge } from "centrifuge";
import { getConnectionToken, getSubscriptionTokenForLiveInquiryChat } from "@/api/webSocket.api";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { getUserInquiryMessages, markInquiryAsRead } from "@/api/user.api";
import useDebounce from "@/hooks/useDebounce";
import UserInquiriesLiveChatHistoryEntry from "./UserInquiriesLiveChatHistoryEntry";
import CuteErrorMessage from "../common/CuteErrorMessage";
import { sortInquiryMessagesByDate } from "@/utils/user.utils";
import SpinnerLoading from "../common/SpinnerLoading";


interface IUserInquiriesLiveChatHistoryProps {
  inquiryId: string;
}

const UserInquiriesLiveChatHistory = (
  { inquiryId }: IUserInquiriesLiveChatHistoryProps
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const [newMessages, setNewMessages] = useState<InquiryMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [connectionAttempt, setConnectionAttempt] = useState<number>(0);

  const inquiryMessagesQuery = useInfiniteQuery({
    queryKey: ['my-page', 'inquiries', 'chat', inquiryId, 'messages'],
    queryFn: async ({ pageParam = "" }) => {
      return await getUserInquiryMessages(pageParam, inquiryId);
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
    subscription.on("publication", (ctx) => {
      if (ctx.data.type === "message") {
        setNewMessages((prevMessages) => [...prevMessages, ctx.data]);
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
  }, [newMessages]);

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

  if (newMessages.length === 0 && sortedOldMessages.length === 0) {
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
      {inquiryMessagesQuery.isFetchingNextPage && (
        <SpinnerLoading />
      )}
      {sortedOldMessages.map((message) => (
        <UserInquiriesLiveChatHistoryEntry key={message.id} message={message} />
      ))}
      {newMessages.map((message) => (
        <UserInquiriesLiveChatHistoryEntry key={message.id} message={message} />
      ))}
    </div>
  )
}

export default UserInquiriesLiveChatHistory;