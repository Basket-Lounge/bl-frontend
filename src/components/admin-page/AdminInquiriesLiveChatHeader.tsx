import { extractInquiryTypeNameInKorean, findInquiryModeratorInCharge } from "@/utils/user.utils";
import { InquiryType, UserInquiryModerator } from "@/models/user.models";
import AdminInquiriesLiveChatHeaderAssignModeratorButton from "./AdminInquiriesLiveChatHeaderAssignModeratorButton";
import AdminInquiriesLiveChatHeaderSolveButton from "./AdminInquiriesLiveChatHeaderSolveButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Image from "next/image";
import ImageButton from "../common/ImageButton";
import { timeAgoKorean } from "@/utils/common.utils";


interface IAdminInquiriesLiveChatHeaderProps {
  title: string;
  updatedAt: string;
  inquiryType: InquiryType;
  inquiryModerators: UserInquiryModerator[];
  solved: boolean;
}

const AdminInquiriesLiveChatHeader = (
  { title, updatedAt, inquiryType, inquiryModerators, solved }: IAdminInquiriesLiveChatHeaderProps
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const inquiryTypeInKorean = extractInquiryTypeNameInKorean(inquiryType);
  const updatedAtInKorean = timeAgoKorean(updatedAt);
  const moderatorsInCharge = findInquiryModeratorInCharge(inquiryModerators);

  const bgColor = solved ? "bg-[#16A34A]" : "bg-color3";

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('inquiry');

    return params.toString()
  }, [searchParams])

  const handleClick = () => {
    router.push(pathname + '?' + createQueryString());
  }

  return (
    <div className={"p-[24px] flex justify-between items-center relative gap-[24px] " + bgColor}>
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
      <div className="flex flex-col items-start gap-[12px] overflow-x-hidden grow w-[calc(100%-88px)]">
        <div className="flex flex-col gap-[12px] items-start">
          <p className="font-medium text-[16px] line-clamp-1">{title}</p>
          <p className="text-[14px]">{updatedAtInKorean}</p>
        </div>
        <div className="flex flex-col gap-[12px] items-start max-w-[calc(100%)]">
          <p className="bg-white rounded-full text-color1 text-[14px] py-[2px] px-[32px] font-medium line-clamp-1 max-w-[calc(100%)]">{inquiryTypeInKorean.trim()}</p>
          {inquiryModerators.length === 0 && (
            <p className="grow bg-white rounded-full text-color1 text-[14px] py-[2px] px-[32px] font-medium line-clamp-1 max-w-[calc(100%)]">담당자 없음</p>
          )}
          {inquiryModerators.length > 0 && moderatorsInCharge.map((moderator) => (
            <p key={moderator.id} className="bg-white rounded-full text-color1 text-[14px] py-[2px] px-[32px] font-semibold line-clamp-1 max-w-[calc(100%)]">중재자: {moderator.moderator_data.username}</p>
          ))}
        </div>
      </div>
      <div className="flex gap-[16px] w-fit">
        <AdminInquiriesLiveChatHeaderAssignModeratorButton moderators={inquiryModerators} />
        <AdminInquiriesLiveChatHeaderSolveButton solved={solved} />
      </div>
    </div>
  )
}

export default AdminInquiriesLiveChatHeader;