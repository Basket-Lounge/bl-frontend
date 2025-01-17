import { UserInquiry } from "@/models/user.models";
import { useEffect, useState } from "react";
import { Centrifuge } from "centrifuge";
import { 
  getConnectionToken, 
  getSubscriptionTokenForLiveAdminInquiriesUpdate 
} from "@/api/webSocket.api";
import { useAuthStore } from "@/stores/auth.stores";
import { sortUserInquiriesByLastMessageDate } from "@/utils/user.utils";
import { useQueryClient } from "@tanstack/react-query";
import AdminInquiriesContainerItem from "./AdminInquiriesContainerItem";
import { TInquiryChannelType } from "@/models/admin.models";
import { determineAdminInquirySubscriptionChannelName } from "@/utils/admin.utils";
import CuteErrorMessage from "../common/CuteErrorMessage";


interface IAdminInquiriesContainerProps {
  inquiries: UserInquiry[];
  inquiryType: TInquiryChannelType;
}

const AdminInquiriesContainer = ({ inquiries, inquiryType }: IAdminInquiriesContainerProps) => {
  const [realInquiries, setRealInquiries] = useState<UserInquiry[]>(inquiries);

  const [, setIsLoading] = useState<boolean>(true);
  const [, setConnected] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);

  const {
    userId
  } = useAuthStore();

  const queryClient = useQueryClient();
  const subscriptionChannelName = determineAdminInquirySubscriptionChannelName(
    inquiryType, 
    userId as number
  );

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
    client.on('connecting', () => {
      setIsLoading(true);
      setConnected(false);
      setError(null);
    });
    client.on("error", () => {
      setIsLoading(false);
      setError("웹소켓 연결 중 오류가 발생했습니다.");
    });

    const subscription = client.newSubscription(subscriptionChannelName, {
      getToken: async () => {
        const data = await getSubscriptionTokenForLiveAdminInquiriesUpdate(inquiryType);
        return data.token;
      }
    });
    subscription.on("subscribed", () => {
      setIsLoading(false);
      setConnected(true);
    });
    subscription.on("error", () => {
      setIsLoading(false);
      setError("해당 채널에 접속할 수 없습니다.");
    });
    subscription.on("publication", (ctx) => {
      console.log("New publication received", ctx);
      queryClient.removeQueries({
        queryKey: ['admin', "inquiries", "pagination"],
      });
      const sortedChatList = sortUserInquiriesByLastMessageDate(
        realInquiries,
        ctx.data, 
      );
      setRealInquiries(() => [...sortedChatList]);
    });

    subscription.subscribe();
    client.connect();

    return () => {
      subscription.unsubscribe();
      client.disconnect();
    }
  }, [inquiryType]);

  if (realInquiries.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage
          error="문의가 없습니다."
        />
      </div>
    );
  }

  return (
    <div className="gap-[24px] items-stretch flex flex-col">
      {realInquiries.map((inquiry) => (
        <AdminInquiriesContainerItem key={inquiry.id} inquiry={inquiry} />
      ))}
    </div>
  );
}

export default AdminInquiriesContainer;