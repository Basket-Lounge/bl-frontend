import { getInquiry } from "@/api/user.api";
import { extractInquiryTypeNameInKorean, sortUserChatMessagesByDate } from "@/utils/user.utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UserChatMessageWithUserData, UserInquiryWithUserData } from "@/models/user.models";
import UserInquiriesLiveChatHistory from "./UserInquiriesLiveChatHistory";
import UserInquiriesLiveChatInput from "./UserInquiriesLiveChatInput";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


interface IUserInquiriesLiveChatProps {
  inquiryId: string;
}

const UserInquiriesLiveChat = ({ inquiryId }: IUserInquiriesLiveChatProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentInquiryId, setCurrentInquiryId] = useState<string>(inquiryId);
  const chatQuery = useSuspenseQuery({
    queryKey: ['my-page', 'inquiries', 'chat', inquiryId],
    queryFn: async () => {
      return await getInquiry(inquiryId);
    }
  });
  const [realInquiry, setRealInquiry] = useState<UserInquiryWithUserData>(chatQuery.data);

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

  const inquiryTypeInKorean = extractInquiryTypeNameInKorean(realInquiry.inquiry_type_data);

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('inquiry');

    return params.toString()
  }, [searchParams])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(pathname + '?' + createQueryString());
  }

  useEffect(() => {
    if (inquiryId !== currentInquiryId) {
      setCurrentInquiryId(inquiryId);
      chatQuery.refetch();
    }
  }, [inquiryId]);

  useEffect(() => {
    if (chatQuery.isSuccess) {
      setRealInquiry(chatQuery.data)
    }
  }, [chatQuery.data]);

  if (chatQuery.isRefetching) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-color3 rounded-md divide-y divide-white overflow-auto">
      <div className="p-[24px] flex justify-between items-center relative">
        <button
          onClick={handleClick}
          className="absolute top-0 right-0 p-[16px] text-white"
        >
          <Image
            src="/icons/close_24dp_FFFFFF.svg"
            alt="close"
            width={24}
            height={24}
          />
        </button>
        <div className="flex gap-[24px]">
          <div className="flex flex-col gap-[12px] items-start">
            <p className="font-semibold text-[16px] line-clamp-1">{realInquiry.title}</p>
            <p className="text-[14px]">{realInquiry.updated_at}</p>
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