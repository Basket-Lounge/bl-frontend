import {  updateInquiry, updateInquiryModerator } from "@/utils/user.utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UserInquiryWithUserData } from "@/models/user.models";
import AdminInquiriesLiveChatHistory from "./AdminInquiriesLiveChatHistory";
import AdminInquiriesLiveChatInput from "./AdminInquiriesLiveChatInput";
import { useCallback, useEffect, useState } from "react";
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
    }
  });

  const [realInquiry, setRealInquiry] = useState<UserInquiryWithUserData>(chatQuery.data);
  const {
    userId
  } = useAuthStore();

  const updateInquiryState = (newInquiry: UserInquiryWithUserData) => {
    const updatedInquiry = updateInquiry(realInquiry, newInquiry);
    setRealInquiry({...updatedInquiry});
  }

  // Update Inquiry whenever a new update is received via WebSocket
  const updateInquiryMod = (newInquiry: UserInquiryWithUserData) => {
    const updatedInquiry = updateInquiryModerator(realInquiry, newInquiry);
    setRealInquiry({...updatedInquiry});
  }

  const isUserModerator = useCallback(() => {
    for (const moderator of realInquiry.moderators) {
      if (moderator.moderator_data.id === userId && moderator.in_charge) {
        return true;
      }
    }
    return false;
  }, [realInquiry.moderators, userId]);

  // Update Inquiry whenever a new Inquiry is selected from the list
  useEffect(() => {
    if (inquiryId !== currentInquiryId) {
      setCurrentInquiryId(inquiryId);
      chatQuery.refetch();
    }
  }, [inquiryId]);

  // Update Inquiry whenever a new Inquiry is received from the API
  // This gets triggered right after the refetch() call inside the useEffect above
  useEffect(() => {
    if (chatQuery.isSuccess) {
      setRealInquiry(chatQuery.data)
    }
  }, [chatQuery.dataUpdatedAt]);

  if (chatQuery.isLoading) {
    return <SpinnerLoading />
  }

  return (
    <div className="bg-color3 rounded-md divide-y divide-white overflow-auto">
      <AdminInquiriesLiveChatHeader
        inquiryType={realInquiry.inquiry_type_data}
        title={realInquiry.title}
        updatedAt={realInquiry.updated_at}
        inquiryModerators={realInquiry.moderators}
        solved={realInquiry.solved}
      />
      <AdminInquiriesLiveChatHistory
        inquiryId={inquiryId}
        updateInquiryState={updateInquiryState}
        updateInquiryModerator={updateInquiryMod}
        solved={realInquiry.solved}
      />
      { (isUserModerator() && !realInquiry.solved) && (
        <div className="p-[24px]">
          <AdminInquiriesLiveChatInput />
        </div>
      )}
    </div>
  )
}

export default AdminInquiriesLiveChat;