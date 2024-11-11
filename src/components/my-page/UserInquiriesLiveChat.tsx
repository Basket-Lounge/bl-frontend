import { getInquiry } from "@/api/user.api";
import { extractInquiryTypeNameInKorean, sortUserChatMessagesByDate } from "@/utils/user.utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UserChatMessageWithUserData } from "@/models/user.models";
import UserInquiriesLiveChatHistory from "./UserInquiriesLiveChatHistory";
import UserInquiriesLiveChatInput from "./UserInquiriesLiveChatInput";
import { useEffect, useState } from "react";


interface IUserInquiriesLiveChatProps {
  inquiryId: string;
}

const UserInquiriesLiveChat = ({ inquiryId }: IUserInquiriesLiveChatProps) => {
  const [currentInquiryId, setCurrentInquiryId] = useState<string>(inquiryId);

  const chatQuery = useSuspenseQuery({
    queryKey: ['my-page', 'inquiries', 'chat', inquiryId],
    queryFn: async () => {
      return await getInquiry(inquiryId);
    }
  });

  const moderatorMessages : UserChatMessageWithUserData[] = chatQuery.data.moderators.map((moderator) => {
    return moderator.messages?.map((message) => {
      return {
        ...message,
        user_data: moderator.moderator_data
      }
    }) || [];
  }).flat();
  
  const userMessages : UserChatMessageWithUserData[] = chatQuery.data.messages?.map((message) => {
    return {
      ...message,
      user_data: chatQuery.data.user_data
    }
  }) || [];

  const messages = moderatorMessages.concat(userMessages || []) || []
  const sortedMessages = sortUserChatMessagesByDate(messages);

  const inquiryTypeInKorean = extractInquiryTypeNameInKorean(chatQuery.data.inquiry_type_data);

  useEffect(() => {
    if (inquiryId !== currentInquiryId) {
      setCurrentInquiryId(inquiryId);
      chatQuery.refetch();
    }
  }, [inquiryId]);

  if (chatQuery.isRefetching) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-color3 rounded-md divide-y divide-white overflow-auto">
      <div className="p-[24px] flex justify-between items-center relative">
        <div className="flex gap-[24px]">
          <div className="flex flex-col gap-[12px] items-start">
            <p className="font-semibold text-[16px] line-clamp-1">{chatQuery.data.title}</p>
            <p className="text-[14px]">{chatQuery.data.updated_at}</p>
            <p className="bg-white rounded-full text-color1 text-[14px] py-[2px] px-[32px] font-semibold">{inquiryTypeInKorean.trim()}</p>
          </div>
        </div>
      </div>
      <UserInquiriesLiveChatHistory
        messages={sortedMessages}
        inquiryId={inquiryId}
      />
      <div className="p-[24px]">
        <UserInquiriesLiveChatInput />
      </div>
    </div>
  )
}

export default UserInquiriesLiveChat;