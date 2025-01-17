import { UserInquiry } from "@/models/user.models";
import { useAuthStore } from "@/stores/auth.stores";
import { extractInquiryTypeNameInKorean } from "@/utils/user.utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


interface IAdminInquiriesContainerItemProps {
  inquiry: UserInquiry;
}

const AdminInquiriesContainerItem = ({ inquiry }: IAdminInquiriesContainerItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    userId
  } = useAuthStore();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const handleClick = () => {
    router.push(pathname + '?' + createQueryString('inquiry', inquiry.id.toString()));
  }

  const unreadCount = inquiry.moderators.find(moderator => moderator.moderator_data.id === userId)?.unread_messages_count || 0;
  const inquiryTypeInKorean = extractInquiryTypeNameInKorean(inquiry.inquiry_type_data);
  const boxBgColor = inquiry.solved ? "bg-[#16A34A]" : "bg-color3";

  return (
    <div 
      className={"p-[24px] rounded-md flex items-center justify-between " + boxBgColor}
      onClick={handleClick}
    >
      <div className="flex gap-[24px] items-center">
        <div className="w-[64px] h-[64px] rounded-full bg-white"></div>
        <div className="flex flex-col gap-[12px]">
          <p className="font-semibold text-[16px]">{inquiry.title}</p>
          <div className="px-[32px] py-[2px] bg-white rounded-full text-color1 text-[14px] font-semibold">{inquiryTypeInKorean}</div>
        </div>
      </div>
      {(!inquiry.solved && unreadCount > 0) ? (
      <div className="relative w-[40px] h-[40px] rounded-full bg-red-500 text-white">
        <p className="font-semibold text-[16px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{unreadCount}</p>
      </div>
      ) : null}
      {inquiry.solved && (
        <div>
          <Image
            src="/icons/check_circle_24dp_FFFFFF.svg"
            alt="Checkmark"
            width={32}
            height={32}
          />
        </div>
      )}
    </div>
  );
}

export default AdminInquiriesContainerItem;