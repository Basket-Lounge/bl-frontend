import { extractInquiryTypeNameInKorean, findInquiryModeratorInCharge } from "@/utils/user.utils";
import { InquiryType, UserInquiryModerator } from "@/models/user.models";
import AdminInquiriesLiveChatHeaderAssignModeratorButton from "./AdminInquiriesLiveChatHeaderAssignModeratorButton";
import AdminInquiriesLiveChatHeaderSolveButton from "./AdminInquiriesLiveChatHeaderSolveButton";


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
  const inquiryTypeInKorean = extractInquiryTypeNameInKorean(inquiryType);
  const moderatorsInCharge = findInquiryModeratorInCharge(inquiryModerators);

  const bgColor = solved ? "bg-[#16A34A]" : "bg-color3";

  return (
    <div className={"p-[24px] flex justify-between items-center relative gap-[24px] " + bgColor}>
      <div className="flex flex-col items-start gap-[12px] overflow-x-hidden grow">
        <div className="flex flex-col gap-[12px] items-start">
          <p className="font-semibold text-[16px] line-clamp-1">{title}</p>
          <p className="text-[14px]">{updatedAt}</p>
        </div>
        <div className="flex flex-col gap-[12px] items-start grow whitespace-nowrap">
          <p className="bg-white rounded-full text-color1 text-[14px] py-[2px] px-[32px] font-semibold w-fit">{inquiryTypeInKorean.trim()}</p>
          {inquiryModerators.length === 0 && (
            <p className="grow bg-white rounded-full text-color1 text-[14px] py-[2px] px-[32px] font-semibold">담당자 없음</p>
          )}
          {inquiryModerators.length > 0 && moderatorsInCharge.map((moderator) => (
            <p key={moderator.id} className="bg-white rounded-full text-color1 text-[14px] py-[2px] px-[32px] font-semibold w-fit">중재자: {moderator.moderator_data.username}</p>
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