import { UserChatMessage, UserInquiry } from "@/models/user.models";
import { getLastMessageFromUserInquiry } from "@/utils/user.utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


interface IUserInquiriesContainerItemProps {
  inquiry: UserInquiry;
}

const UserInquiriesContainerItem = ({ inquiry }: IUserInquiriesContainerItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || '1');

  const unreadCount = inquiry.moderators.reduce((acc, moderator) => {
    const unread_messages_count = moderator.unread_messages_count || 0;
    return acc + unread_messages_count;
  }, 0);
  const lastMessage : UserChatMessage | undefined = getLastMessageFromUserInquiry(inquiry);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push(pathname + `?page=${page}&inquiry=${inquiry.id}`);
  }

  return (
    <div 
      className="p-[24px] bg-color3 rounded-md flex items-center justify-between"
      onClick={handleClick}
    >
      <div className="flex gap-[24px] items-center">
        <div className="w-[64px] h-[64px] rounded-full bg-white"></div>
        <div className="flex flex-col gap-[12px]">
          <p className="font-semibold text-[16px]">{inquiry.title}</p>
          <p className="text-[14px]">{lastMessage?.message || '메시지 없음'}</p>
        </div>
      </div>
      {unreadCount > 0 && (
      <div className="relative w-[40px] h-[40px] rounded-full bg-red-500 text-white">
        <p className="font-semibold text-[16px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{unreadCount}</p>
      </div>
      )}
    </div>
  );
}

export default UserInquiriesContainerItem;