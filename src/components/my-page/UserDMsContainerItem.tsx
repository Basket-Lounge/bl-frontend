import { UserChat, UserChatMessage } from "@/models/user.models";
import { useAuthStore } from "@/stores/auth.stores";
import { getLastMessageFromUserChat } from "@/utils/user.utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


interface IUserDMsContainerItemProps {
  chat: UserChat;
}

const UserDMsContainerItem = ({ chat }: IUserDMsContainerItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    username
  } = useAuthStore();

  const page = parseInt(searchParams.get("page") || '1');
  const otherUser = chat.participants.find(
    participant => participant.user_data.username !== username
  );
  const unreadCount = otherUser?.unread_messages_count || 0;
  const lastMessage : UserChatMessage | undefined = getLastMessageFromUserChat(chat, username || '');

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push(pathname + `?page=${page}&user=${otherUser?.user_data.id}`);
  }

  return (
    <div 
      className="p-[24px] bg-color3 rounded-md flex items-center justify-between"
      onClick={handleClick}
    >
      <div className="flex gap-[24px] items-center">
        <div className="w-[64px] h-[64px] rounded-full bg-white"></div>
        <div className="flex flex-col gap-[12px]">
            <p className="font-semibold text-[16px]">{otherUser?.user_data.username}</p>
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

export default UserDMsContainerItem;