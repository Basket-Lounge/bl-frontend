import { UserChat } from "@/models/user.models";
import { useAuthStore } from "@/stores/auth.stores";
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push(pathname + `?page=${page}&user=${otherUser?.user_data.id}`);
  }

  return (
    <div 
      className="flex gap-[24px] items-center p-[24px] bg-color3 rounded-md"
      onClick={handleClick}
    >
      <div className="w-[64px] h-[64px] rounded-full bg-white"></div>
      <div className="flex flex-col gap-[12px]">
        <p className="font-semibold text-[16px]">{otherUser?.user_data.username}</p>
        <p className="text-[14px]">{otherUser?.last_message?.message || '메시지 없음'}</p>
      </div>
    </div>
  );
}

export default UserDMsContainerItem;