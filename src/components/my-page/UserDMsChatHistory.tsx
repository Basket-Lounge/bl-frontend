import { UserChatMessageWithUserData } from "@/models/user.models";
import UserDMsChatHistoryEntry from "./UserDMsChatHistoryEntry";
import { useEffect, useMemo, useRef, useState } from "react";
import { Centrifuge } from "centrifuge";
import { getConnectionToken, getSubscriptionTokenForLiveUserChat } from "@/api/webSocket.api";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { getUserChatMessages, markChatAsRead } from "@/api/user.api";
import useDebounce from "@/hooks/useDebounce";
import CuteErrorMessage from "../common/CuteErrorMessage";
import SpinnerLoading from "../common/SpinnerLoading";
import { sortUserChatMessagesByDate } from "@/utils/user.utils";


interface IUserDMsChatHistoryProps {
  chatId: string;
  userId: number;
}

const UserDMsChatHistory = ({ chatId, userId }: IUserDMsChatHistoryProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const [sortedMessages, setSortedMessages] = useState<UserChatMessageWithUserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [connectionAttempt, setConnectionAttempt] = useState<number>(0);

  const userChatMessagesQuery = useInfiniteQuery({
    queryKey: ['my-page', "DMs", "chat", userId, "messages"],
    queryFn: async ({ pageParam = "" }) => {
      return await getUserChatMessages(pageParam, userId);
    }, 
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      if (lastPage.next == null) {
        return undefined;
      }
      
      const myURL = new URL(lastPage.next);
      const cursor = myURL.searchParams.get('cursor');
      return cursor;
    }
  });

  const sortedInitialMessages = useMemo(() => {
    return sortUserChatMessagesByDate(userChatMessagesQuery.data?.pages.map((page) => page.results).flat() || []);
  }, [userChatMessagesQuery.data]);

  const markAsReadMutation = useMutation({
    mutationFn: async () => {
      return markChatAsRead(userId);
    }
  });

  const markAsReadDebounceCallback = useDebounce(() => {
    markAsReadMutation.mutate();
  }, 5000);

  const loadPreviousMessages = useDebounce(() => {
    userChatMessagesQuery.fetchNextPage();
  }, 300);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
    });
    subscription.on("error", (ctx) => {
      setIsLoading(false);
      setError("해당 채널에 접속할 수 없습니다.");
    });
    subscription.on("publication", (ctx) => {
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

  useEffect(() => {
    // run after 5 seconds to ensure that the elementRef is not null
    const timeout = setTimeout(() => {
      elementRef.current?.addEventListener("scroll", handleScroll);
    }, 5000);
    
    return () => {
      clearTimeout(timeout);
      elementRef.current?.removeEventListener("scroll", handleScroll);
    }
  }, [userChatMessagesQuery.dataUpdatedAt]);

  if (isLoading) {
    return (
      <SpinnerLoading />
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

  if (sortedMessages.length === 0 && sortedInitialMessages.length === 0) {
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
      {userChatMessagesQuery.isFetchingNextPage && (
        <SpinnerLoading />
      )}
      {sortedInitialMessages.map((message) => (
        <UserDMsChatHistoryEntry key={message.id} message={message} />
      ))}
      {sortedMessages.map((message) => (
        <UserDMsChatHistoryEntry key={message.id} message={message} />
      ))}
    </div>
  )
}

export default UserDMsChatHistory;