import { UserChat, UserChatMessage } from "@/models/user.models";
import { useAuthStore } from "@/stores/auth.stores";
import { getLastMessageFromUserChat } from "@/utils/user.utils";
import Image from "next/image";
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
  const otherUser = chat.participants.find(participant => participant.user_data.username !== username);
  const user = chat.participants.find(participant => participant.user_data.username === username);
  const userFavTeamSymbol = otherUser?.user_data.favorite_team?.symbol.toLowerCase();
  const unreadCount = user?.unread_messages_count || 0;
  const lastMessage : UserChatMessage | undefined = getLastMessageFromUserChat(chat, username || '');

  const handleClick = () => {
    router.push(pathname + `?page=${page}&user=${otherUser?.user_data.id}`);
  }

  return (
    <div 
      className="p-[24px] bg-color3 rounded-md flex items-center justify-between"
      onClick={handleClick}
    >
      <div className="flex gap-[24px] items-center overflow-hidden xl:max-w-[calc(100%-64px)] w-[calc(100%-56px)]">
        {userFavTeamSymbol ? (
          <div className="w-[48px] xl:w-[64px] bg-transparent rounded-full relative text-black">
            <Image
              className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
              src={'/logos/' + userFavTeamSymbol + '.svg'} 
              alt="team-logo"
              width={20}
              height={20}
            />
          </div>
        ) : (
          <div className="w-[48px] h-[48px] xl:w-[64px] xl:h-[64px] bg-white rounded-full relative">
            <div className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center font-semibold text-[20px] text-color1">
              {otherUser?.user_data.username.slice(0, 1) || 'U'}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-[12px] overflow-hidden xl:w-[calc(100%-88px)] w-[calc(100%-72px)]">
          <p className="font-medium text-[14px] xl:text-[16px]">{otherUser?.user_data.username}</p>
          <p className="text-[14px] line-clamp-1 break-words">{lastMessage?.message || '메시지 없음'}</p>
        </div>
      </div>
      {unreadCount > 0 && (
      <div className="relative w-[32px] h-[32px] xl:w-[40px] xl:h-[40px] rounded-full bg-red-500 text-white">
        <p className="font-semibold text-[14px] xl:text-[16px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {unreadCount >= 100 ? "99+" : unreadCount}
        </p>
      </div>
      )}
    </div>
  );
}

export default UserDMsContainerItem;