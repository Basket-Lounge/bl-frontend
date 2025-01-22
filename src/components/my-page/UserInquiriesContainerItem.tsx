import { UserChatMessage, UserInquiryWithUserDataFavoriteTeam } from "@/models/user.models";
import { getLastMessageFromUserInquiry, getProfilePictureFromLastInquiryMessage } from "@/utils/user.utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


interface IUserInquiriesContainerItemProps {
  inquiry: UserInquiryWithUserDataFavoriteTeam;
}

const UserInquiriesContainerItem = ({ inquiry }: IUserInquiriesContainerItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || '1');

  const lastMessage : UserChatMessage | null | undefined = getLastMessageFromUserInquiry(inquiry);
  const lastMessageUserData = getProfilePictureFromLastInquiryMessage(inquiry);
  const favoriteTeamSymbol = lastMessageUserData?.favorite_team?.symbol.toLowerCase();
  const username = inquiry.user_data.username;

  const handleClick = () => {
    router.push(pathname + `?page=${page}&inquiry=${inquiry.id}`);
  }

  return (
    <div 
      className="p-[24px] bg-color3 rounded-md flex items-center justify-between"
      onClick={handleClick}
    >
      <div className="flex gap-[24px] items-center overflow-hidden max-w-[calc(100%-64px)]">
        {favoriteTeamSymbol ? (
          <div className="w-[48px] xl:w-[64px] bg-transparent rounded-full relative text-black">
            <Image
              className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
              src={'/logos/' + favoriteTeamSymbol + '.svg'} 
              alt="team-logo"
              width={20}
              height={20}
            />
          </div>
        ) : (
          <div className="w-[48px] h-[48px] xl:w-[64px] xl:h-[64px] bg-white rounded-full relative">
            <div className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center font-semibold text-[20px] text-color1">
              {username.slice(0, 1) || 'U'}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-[12px] overflow-hidden xl:w-[calc(100%-88px)] w-[calc(100%-72px)]">
          <p className="font-medium text-[14px] xl:text-[16px] w-[calc(100%)] line-clamp-1">{inquiry.title}</p>
          <p className="text-[14px] line-clamp-1 break-words w-[calc(100%)]">{lastMessage?.message || '메시지 없음'}</p>
        </div>
      </div>
      {(inquiry.unread_messages_count && inquiry.unread_messages_count > 0) ? (
        <div className="relative xl:w-[40px] xl:h-[40px] w-[32px] h-[32px] rounded-full bg-red-500 text-white">
          <p className="font-semibold text-[14px] xl:text-[16px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {inquiry.unread_messages_count >= 100 ? "99+" : inquiry.unread_messages_count}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default UserInquiriesContainerItem;