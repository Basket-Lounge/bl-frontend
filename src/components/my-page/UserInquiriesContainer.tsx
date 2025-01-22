import { UserInquiry, UserInquiryWithUserDataFavoriteTeam } from "@/models/user.models";
import { useEffect, useState } from "react";
import { Centrifuge } from "centrifuge";
import { getConnectionToken, getSubscriptionTokenForLiveInquiriesUpdate } from "@/api/webSocket.api";
import { useAuthStore } from "@/stores/auth.stores";
import { sortUserInquiriesByLastMessageDate } from "@/utils/user.utils";
import { useQueryClient } from "@tanstack/react-query";
import UserInquiriesContainerItem from "./UserInquiriesContainerItem";
import CuteErrorMessage from "../common/CuteErrorMessage";


interface IUserInquiriesContainerProps {
  inquiries: UserInquiryWithUserDataFavoriteTeam[];
}

const UserInquiriesContainer = ({ inquiries }: IUserInquiriesContainerProps) => {
  const [realInquiries, setRealInquiries] = useState<UserInquiryWithUserDataFavoriteTeam[]>(inquiries);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionAttempt, setConnectionAttempt] = useState<number>(0);

  const {
    userId
  } = useAuthStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    setRealInquiries(inquiries);
  }, [inquiries]);

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

    const subscription = client.newSubscription(`users/${userId}/inquiries/updates`, {
      getToken: async () => {
        const data = await getSubscriptionTokenForLiveInquiriesUpdate();
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
      queryClient.removeQueries({
        queryKey: ['my-page', "inquiries", "pagination"],
      });
      const sortedChatList = sortUserInquiriesByLastMessageDate(
        realInquiries,
        ctx.data, 
      );
      setRealInquiries(prevInquiries => [...sortedChatList]);
    });

    subscription.subscribe();
    client.connect();

    return () => {
      subscription.unsubscribe();
      client.disconnect();
    }
  }, [connectionAttempt]);

  if (realInquiries.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage error="포스트가 없습니다." />
      </div>
    );
  }

  return (
    <div className="gap-[24px] items-stretch flex flex-col">
      {realInquiries.map((inquiry) => (
        <UserInquiriesContainerItem key={inquiry.id} inquiry={inquiry} />
      ))}
    </div>
  );
}

export default UserInquiriesContainer;