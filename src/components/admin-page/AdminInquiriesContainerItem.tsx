import { UserInquiryWithUserDataFavoriteTeam } from "@/models/user.models";
import { useAuthStore } from "@/stores/auth.stores";
import { extractInquiryTypeNameInKorean } from "@/utils/user.utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


interface IAdminInquiriesContainerItemProps {
  inquiry: UserInquiryWithUserDataFavoriteTeam
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
  const favoriteTeamSymbol = inquiry.user_data.favorite_team?.symbol.toLowerCase();
  const username = inquiry.user_data.username;

  return (
    <div 
      className={"p-[24px] rounded-md flex items-center justify-between " + boxBgColor}
      onClick={handleClick}
    >
      <div className="flex gap-[24px] items-center overflow-hidden xl:max-w-[calc(100%-120px)] w-[calc(100%-70px)]">
        {favoriteTeamSymbol ? (
          <div className="w-[32px] xl:w-[64px] bg-transparent rounded-full relative text-black">
            <Image
              className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
              src={'/logos/' + favoriteTeamSymbol + '.svg'} 
              alt="team-logo"
              width={20}
              height={20}
            />
          </div>
        ) : (
          <div className="w-[32px] h-[32px] xl:w-[64px] xl:h-[64px] bg-white rounded-full relative">
            <div className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center font-semibold text-[16px] xl:text-[20px] text-color1">
              {username.slice(0, 1) || 'U'}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-[12px] items-start w-[calc(100%-56px)] xl:w-[calc(100%-88px)]">
          <p className="font-medium text-[14px] xl:text-[16px] line-clamp-1">{inquiry.title}</p>
          <div className="px-[32px] py-[2px] bg-white rounded-full text-color1 text-[14px] font-medium line-clamp-1 max-w-[calc(100%)]">{inquiryTypeInKorean}</div>
        </div>
      </div>
      {(!inquiry.solved && unreadCount > 0) ? (
      <div className="relative w-[32px] h-[32px] xl:w-[40px] xl:h-[40px] rounded-full bg-red-500 text-white">
        <p className="font-semibold text-[14px] xl:text-[16px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {unreadCount >= 100 ? "99+" : unreadCount}
        </p>
      </div>
      ) : null}
      {inquiry.solved && (
        <div>
          <Image
            src="/icons/check_circle_24dp_FFFFFF.svg"
            className="xl:w-[32px] xl:h-[32px] w-[24px] h-[24px]"
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