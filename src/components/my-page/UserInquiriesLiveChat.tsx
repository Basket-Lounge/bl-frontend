import { getInquiry } from "@/api/user.api";
import { extractInquiryTypeNameInKorean, updateInquiry, updateInquiryModerator } from "@/utils/user.utils";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import UserInquiriesLiveChatHistory from "./UserInquiriesLiveChatHistory";
import UserInquiriesLiveChatInput from "./UserInquiriesLiveChatInput";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SpinnerLoading from "../common/SpinnerLoading";
import { timeAgoKorean } from "@/utils/common.utils";
import ImageButton from "../common/ImageButton";


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
    },
    staleTime: Infinity
  });

  const inquiryTypeInKorean = extractInquiryTypeNameInKorean(chatQuery.data.inquiry_type_data);
  const updatedAt = useMemo(() => timeAgoKorean(chatQuery.data.updated_at), [chatQuery.data.updated_at]);
  const bgColor = chatQuery.data.solved ? "bg-[#16A34A]" : "bg-color3";

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('inquiry');

    return params.toString()
  }, [searchParams])

  const handleClick = () => {
    router.push(pathname + '?' + createQueryString());
  }

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
      <div className={ "p-[24px] flex justify-between items-center relative " + bgColor }>
        <ImageButton
          onClick={handleClick}
          className="absolute top-0 right-0 p-[16px] text-white"
        >
          <Image
            src="/icons/close_24dp_FFFFFF.svg"
            alt="close"
            width={24}
            height={24}
          />
        </ImageButton>
        <div className="flex gap-[24px] w-[calc(100%)]">
          <div className="flex flex-col gap-[12px] w-[calc(100%-88px)]">
            <p className="font-medium text-[16px] line-clamp-1">{chatQuery.data.title}</p>
            <p className="text-[14px]">{updatedAt}</p>
            <p className="w-fit bg-white rounded-full text-color1 text-[14px] py-[2px] px-[32px] line-clamp-1 font-medium max-w-[calc(100%)]">{inquiryTypeInKorean.trim()}</p>
          </div>
        </div>
      </div>
      <UserInquiriesLiveChatHistory
        inquiryId={inquiryId}
      />
      { chatQuery.data.solved === false && (
        <div className="p-[24px]">
          <UserInquiriesLiveChatInput />
        </div>
      )}
    </div>
  )
}

export default UserInquiriesLiveChat;