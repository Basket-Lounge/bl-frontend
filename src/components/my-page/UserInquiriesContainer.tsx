import { UserInquiryWithUserDataFavoriteTeam } from "@/models/user.models";
import { useEffect, useState } from "react";
import { Centrifuge } from "centrifuge";
import { getConnectionToken, getSubscriptionTokenForLiveInquiriesUpdate } from "@/api/webSocket.api";
import { useAuthStore } from "@/stores/auth.stores";
import { sortUserInquiriesByLastMessageDate } from "@/utils/user.utils";
import { useQueryClient } from "@tanstack/react-query";
import UserInquiriesContainerItem from "./UserInquiriesContainerItem";
import CuteErrorMessage from "../common/CuteErrorMessage";
import { useSearchParams } from "next/navigation";
import { IPaginationResult } from "@/models/common.models";
import { toast } from "react-toastify";


interface IUserInquiriesContainerProps {
  inquiries: UserInquiryWithUserDataFavoriteTeam[];
}

// TODO: Create an option for reloading the websocket connection if it fails
const UserInquiriesContainer = ({ inquiries }: IUserInquiriesContainerProps) => {
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

  const handleInquiryUpdate = (data: any) => {
    if (page === 1) {
      const oldData = queryClient.getQueryData<IPaginationResult<UserInquiryWithUserDataFavoriteTeam>>(
        ['my-page', 'inquiries', 'pagination', page]
      );
      const sortedChatList = sortUserInquiriesByLastMessageDate(
        [...oldData?.results || []],
        data, 
      );
      const newInquiries = [...sortedChatList];
      queryClient.setQueryData(
        ['my-page', "inquiries", "pagination", page],
        (oldData: IPaginationResult<UserInquiryWithUserDataFavoriteTeam>) => {
          return {
            ...oldData,
            results: newInquiries,
          }
        }
      )
    }

    queryClient.invalidateQueries({
      predicate(query) {
        if (query.queryKey.length < 4) {
          return false;
        }

        const isValidKey = query.queryKey[0] === 'my-page' &&
          query.queryKey[1] === 'inquiries' &&
          query.queryKey[2] === 'pagination'
        
        const isNotPage1 = query.queryKey[3] !== 1;
        
        return isValidKey && isNotPage1;
      },
    })
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
      setError("웹소켓 연결 중 오류가 발생했습니다.");
      toast.error("서버 문제로 인해 실시간 업데이트를 받을 수 없습니다. 페이지를 새로고침해주세요.");
    });

    const subscription = client.newSubscription(`users/${userId}/inquiries/updates`, {
      getToken: async () => {
        const data = await getSubscriptionTokenForLiveInquiriesUpdate();
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
      toast.error("채널 접속 문제로 인해 실시간 업데이트를 받을 수 없습니다. 페이지를 새로고침해주세요.");
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
  }, [connectionAttempt, page]);

  if (inquiries.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage error="문의 목록이 없습니다." />
      </div>
    );
  }

  return (
    <div className="gap-[24px] items-stretch flex flex-col">
      {inquiries.map((inquiry) => (
        <UserInquiriesContainerItem key={inquiry.id} inquiry={inquiry} />
      ))}
    </div>
  );
}

export default UserInquiriesContainer;