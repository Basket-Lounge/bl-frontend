import { UserChat } from "@/models/user.models";
import UserDMsContainerItem from "./UserDMsContainerItem";
import { useEffect, useState } from "react";
import { Centrifuge } from "centrifuge";
import { getConnectionToken, getSubscriptionTokenForLiveChatUpdate } from "@/api/webSocket.api";
import { useAuthStore } from "@/stores/auth.stores";
import { sortUserChatByLastMessageDate } from "@/utils/user.utils";
import { useQueryClient } from "@tanstack/react-query";
import CuteErrorMessage from "../common/CuteErrorMessage";
import { useSearchParams } from "next/navigation";
import { IPaginationResult } from "@/models/common.models";
import { toast } from "react-toastify";


interface IUserDMsContainerProps {
  chats: UserChat[];
}

// TODO: Create an option for reloading the websocket connection if it fails
const UserDMsContainer = ({ chats }: IUserDMsContainerProps) => {
  const [, setIsLoading] = useState<boolean>(true);
  const [, setConnected] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);
  const [connectionAttempt] = useState<number>(0);

  const {
    userId
  } = useAuthStore();

  const searchParams = useSearchParams();

  const queryClient = useQueryClient();

  const page = parseInt(searchParams.get("page") || '1');
  const sort = searchParams.get('sort') || '';
  const search = searchParams.get('search') || '';

  const handleInquiryUpdate = (data: any) => {
    if (page === 1) {
      const oldData = queryClient.getQueryData<IPaginationResult<UserChat>>(
        ['my-page', "DMs", "pagination", page, { sort, search }],
      );

      const sortedChatList = sortUserChatByLastMessageDate(
        [...oldData?.results || []],
        data, 
      );
      const newChats = [...sortedChatList];
      queryClient.setQueryData(
        ['my-page', "DMs", "pagination", page, { sort, search }],
        (oldData: IPaginationResult<UserChat>) => {
          return {
            ...oldData,
            results: newChats,
          }
        }
      )
    }

    queryClient.invalidateQueries({
      predicate(query) {
        if (query.queryKey.length < 5) {
          return false;
        }

        const isValidKey = query.queryKey[0] === 'my-page' &&
          query.queryKey[1] === 'DMs' &&
          query.queryKey[2] === 'pagination';

        const isNotPage1 = query.queryKey[3] !== 1;

        const isSortEmpty = (query.queryKey[4] as { sort: string })?.sort === '';
        const isSearchEmpty = (query.queryKey[4] as { search: string })?.search === '';

        return isValidKey && isNotPage1 && isSortEmpty && isSearchEmpty;
      },
    })
  }

  useEffect(() => {
    // Disable websocket connection if sort or search is active
    if (sort || search) {
      return;
    }

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
      setError("채팅 서버에 연결할 수 없습니다. 다시 시도해주세요.");
      toast.error("채팅 서버에 연결할 수 없습니다. 다시 시도해주세요.");
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
      toast.error("해당 채널에 접속할 수 없습니다. 다시 시도해주세요.");
    });
    subscription.on("publication", (ctx) => {
      handleInquiryUpdate(ctx.data);
    });

    subscription.subscribe();
    client.connect();

    return () => {
      subscription.unsubscribe();
      client.disconnect();
    }
  }, [connectionAttempt, page, sort, search]);

  if (chats.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage error="채팅 목록이 없습니다." />
      </div>
    );
  }

  return (
    <div className="gap-[24px] items-stretch flex flex-col">
      {chats.map((chat) => (
        <UserDMsContainerItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
}

export default UserDMsContainer;