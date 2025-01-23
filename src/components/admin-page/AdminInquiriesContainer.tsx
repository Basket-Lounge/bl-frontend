import { UserInquiryWithUserDataFavoriteTeam } from "@/models/user.models";
import { useEffect, useMemo, useState } from "react";
import { Centrifuge } from "centrifuge";
import { 
  getConnectionToken, 
  getSubscriptionTokenForLiveAdminInquiriesUpdate 
} from "@/api/webSocket.api";
import { useAuthStore } from "@/stores/auth.stores";
import { sortUserInquiriesByLastMessageDate } from "@/utils/user.utils";
import { useQueryClient } from "@tanstack/react-query";
import AdminInquiriesContainerItem from "./AdminInquiriesContainerItem";
import { inquiryChannelTypes, TInquiryChannelType } from "@/models/admin.models";
import { determineAdminInquirySubscriptionChannelName } from "@/utils/admin.utils";
import CuteErrorMessage from "../common/CuteErrorMessage";
import { useSearchParams } from "next/navigation";
import { IPaginationResult } from "@/models/common.models";


interface IAdminInquiriesContainerProps {
  inquiries: UserInquiryWithUserDataFavoriteTeam[];
  inquiryType: TInquiryChannelType;
}

// TODO: Create an option for reloading the websocket connection if it fails
const AdminInquiriesContainer = ({ inquiries, inquiryType }: IAdminInquiriesContainerProps) => {
  const [, setIsLoading] = useState<boolean>(true);
  const [, setConnected] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);

  const {
    userId
  } = useAuthStore();

  const searchParams = useSearchParams();
  const filter : TInquiryChannelType = useMemo(() => {
    if (searchParams.has("filter") === false) {
      return 'all';
    }
    // Check if the filter is of the correct type
    if (inquiryChannelTypes.includes(searchParams.get("filter") as TInquiryChannelType) === false) {
      return 'all';
    }

    return searchParams.get("filter") as TInquiryChannelType;
  }, [searchParams]);
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get("page") || '1');

  const handleInquiryUpdate = (data: any) => {
    if (page === 1) {
      const oldData = queryClient.getQueryData<IPaginationResult<UserInquiryWithUserDataFavoriteTeam>>(
        ['admin', 'inquiries', 'pagination', page, { filter, search }]
      );

      const sortedInquiriesList = sortUserInquiriesByLastMessageDate(
        [...oldData?.results || []],
        data, 
      );
      const newInquiries = [...sortedInquiriesList];
      queryClient.setQueryData(
        ['admin', "inquiries", "pagination", page, { filter, search }],
        (oldData: IPaginationResult<UserInquiryWithUserDataFavoriteTeam>) => {
          return {
            ...oldData,
            results: newInquiries,
          }
        },
      )
    }

    queryClient.invalidateQueries({
      predicate(query) {
        if (query.queryKey.length < 5) {
          return false;
        }

        const isValidKey = query.queryKey[0] === 'admin' &&
          query.queryKey[1] === 'inquiries' &&
          query.queryKey[2] === 'pagination'

        const isNotPage1 = query.queryKey[3] !== 1;
        
        const isFilterSame = (query.queryKey[4] as { filter: TInquiryChannelType })?.filter === filter;
        const isSearchEmpty = (query.queryKey[4] as { search: string })?.search === '';

        return isValidKey && isNotPage1 && isFilterSame && isSearchEmpty;
      },
    })
  }

  const queryClient = useQueryClient();
  const subscriptionChannelName = determineAdminInquirySubscriptionChannelName(
    inquiryType, 
    userId as number
  );

  useEffect(() => {
    // Disable websocket connection if search is active
    if (search !== '') {
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
      setError("서버 연결 중 오류가 발생했습니다.");
    });

    const subscription = client.newSubscription(subscriptionChannelName, {
      getToken: async () => {
        const data = await getSubscriptionTokenForLiveAdminInquiriesUpdate(inquiryType);
        return data.token;
      }
    });
    subscription.on("subscribed", () => {
      setIsLoading(false);
      setError(null);
      setConnected(true);
    });
    subscription.on("error", () => {
      setIsLoading(false);
      setConnected(false);
      setError("해당 채널에 접속할 수 없습니다.");
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
  }, [inquiryType, page, search, filter]);

  if (inquiries.length === 0) {
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
      {inquiries.map((inquiry) => (
        <AdminInquiriesContainerItem key={inquiry.id} inquiry={inquiry} />
      ))}
    </div>
  );
}

export default AdminInquiriesContainer;