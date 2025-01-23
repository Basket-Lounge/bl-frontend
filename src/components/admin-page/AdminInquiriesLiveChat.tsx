import { updateInquiry, updateInquiryModerator } from "@/utils/user.utils";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { UserInquiryWithUserData } from "@/models/user.models";
import AdminInquiriesLiveChatHistory from "./AdminInquiriesLiveChatHistory";
import AdminInquiriesLiveChatInput from "./AdminInquiriesLiveChatInput";
import { useCallback, useEffect, useMemo, useState } from "react";
import AdminInquiriesLiveChatHeader from "./AdminInquiriesLiveChatHeader";
import { useAuthStore } from "@/stores/auth.stores";
import { getInquiry } from "@/api/admin.api";
import SpinnerLoading from "../common/SpinnerLoading";


interface IAdminInquiriesLiveChatProps {
  inquiryId: string;
}

const AdminInquiriesLiveChat = ({ inquiryId }: IAdminInquiriesLiveChatProps) => {
  const [currentInquiryId, setCurrentInquiryId] = useState<string>(inquiryId);
  const chatQuery = useSuspenseQuery({
    queryKey: ['admin', 'inquiries', 'chat', inquiryId],
    queryFn: async () => {
      return await getInquiry(inquiryId);
    },
    staleTime: Infinity
  });

  const {
    userId
  } = useAuthStore();

  const queryClient = useQueryClient();
  const updateInquiryState = useCallback((newInquiry: UserInquiryWithUserData) => {
    const oldData = queryClient.getQueryData<UserInquiryWithUserData>(
      ['admin', 'inquiries', 'chat', inquiryId]
    );

    if (oldData == undefined) {
      return;
    }

    const updatedInquiry = updateInquiry(oldData, newInquiry);
    queryClient.setQueryData(
      ['admin', 'inquiries', 'chat', inquiryId],
      () => {
        return { ...updatedInquiry };
      }
    );
  }, [queryClient, inquiryId]);

  const updateInquiryMod = useCallback((newInquiry: UserInquiryWithUserData) => {
    const oldData = queryClient.getQueryData<UserInquiryWithUserData>(
      ['admin', 'inquiries', 'chat', inquiryId]
    );

    if (oldData == undefined) {
      return;
    }

    const updatedInquiry = updateInquiryModerator(oldData, newInquiry);
    queryClient.setQueryData(
      ['admin', 'inquiries', 'chat', inquiryId],
      () => {
        return { ...updatedInquiry };
      }
    );
  }, [queryClient, inquiryId]);

  const isUserModerator = useMemo(() => {
    for (const moderator of chatQuery.data.moderators) {
      if (moderator.moderator_data.id === userId && moderator.in_charge) {
        return true;
      }
    }
    return false;
  }, [chatQuery.data.moderators, userId]);

  // Update Inquiry whenever a new inquiry is selected from the list
  useEffect(() => {
    if (inquiryId !== currentInquiryId) {
      setCurrentInquiryId(inquiryId);
      chatQuery.refetch();
    }
  }, [inquiryId]);

  if (chatQuery.isLoading) {
    return <SpinnerLoading />
  }

  return (
    <div className="bg-color3 rounded-md divide-y divide-white overflow-auto">
      <AdminInquiriesLiveChatHeader
        title={chatQuery.data.title}
        updatedAt={chatQuery.data.updated_at}
        inquiryType={chatQuery.data.inquiry_type_data}
        inquiryModerators={chatQuery.data.moderators}
        solved={chatQuery.data.solved}
      />
      <AdminInquiriesLiveChatHistory
        inquiryId={inquiryId}
        updateInquiryState={updateInquiryState}
        updateInquiryModerator={updateInquiryMod}
        solved={chatQuery.data.solved}
      />
      { (isUserModerator && !chatQuery.data.solved) && (
        <div className="p-[24px]">
          <AdminInquiriesLiveChatInput />
        </div>
      )}
    </div>
  )
}

export default AdminInquiriesLiveChat;