import { getUserChat } from "@/api/user.api";
import { sortUserChatMessagesByDate } from "@/utils/user.utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import UserDMsChatInput from "./UserDMsChatInput";
import UserDMsChatHistory from "./UserDMsChatHistory";
import { UserChatMessageWithUserData } from "@/models/user.models";
import UserDMsChatControlButtons from "./UserDMsChatControlButtons";
import { useCallback, useEffect, useState } from "react";
import SpinnerLoading from "../common/SpinnerLoading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";


interface IUserDMsChatProps {
  userId: number;
}

const UserDMsChat = ({ userId }: IUserDMsChatProps) => {
  const [currentUserId, setCurrentUserId] = useState<number>(userId);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('user');

    return params.toString()
  }, [searchParams])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(pathname + '?' + createQueryString());
  }

  const chatQuery = useSuspenseQuery({
    queryKey: ['my-page', "DMs", "chat", userId],
    queryFn: async () => {
      return await getUserChat(userId);
    }
  });

  const otherUser = chatQuery.data.participants.find((participant) => participant.user_data.id === userId);
  
  useEffect(() => {
    if (userId !== currentUserId) {
      setCurrentUserId(userId);
      chatQuery.refetch();
    }
  }, [userId]);

  if (chatQuery.isRefetching) {
    return <SpinnerLoading />
  }

  return (
    <div className="bg-color3 rounded-md divide-y divide-white overflow-auto">
      <div className="p-[24px] flex justify-between items-center relative">
        <button
          onClick={handleClick}
          className="absolute top-0 right-0 p-[8px] text-white"
        >
          <Image
            src="/icons/close_24dp_FFFFFF.svg"
            alt="close"
            width={24}
            height={24}
          />
        </button>
        <div className="flex gap-[24px]">
          <div className="flex w-[64px] h-[64px] bg-white rounded-full"></div>
          <div className="flex flex-col gap-[12px]">
            <p className="font-semibold text-[16px] line-clamp-1">{otherUser?.user_data.username}</p>
            <p className="text-[14px]">{chatQuery.data.updated_at}</p>
          </div>
        </div>
        <UserDMsChatControlButtons userId={userId} />
      </div>
      <UserDMsChatHistory 
        chatId={chatQuery.data.id}
        userId={userId}
      />
      <div className="p-[24px]">
        <UserDMsChatInput />
      </div>
    </div>
  )
}

export default UserDMsChat;