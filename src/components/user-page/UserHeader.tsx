import { IUser } from "@/models/user.models";
import { translateRoleNameToKorean } from "@/utils/user.utils";
import Image from "next/image";
import UserHeaderLikeButton from "./UserHeaderLikeButton";
import UserHeaderChatButton from "./UserHeaderChatButton";
import UserHeaderReportButton from "./UserHeaderReportButton";
import { useAuthStore } from "@/stores/auth.stores";


interface IUserHeaderProps {
  user: IUser;
}

export default function UserHeader({ user }: IUserHeaderProps) {
  const {
    userId
  } = useAuthStore();

  return (
    <div className="flex gap-[48px] items-start justify-between">
      {/* Team Logo */}
      <div className="flex gap-[48px] items-start">
        <div className="w-[156px] h-[156px] rounded-full bg-white relative">
          <Image
            className="w-auto h-[70%] absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
            src={'/logos/' + 'atl' + '.svg'}
            alt="team-logo"
            width={20}
            height={20}
          />
        </div>
        {/* Team Name */}
        <div className="flex flex-col gap-[12px] grow">
          <h1 className="text-white text-[24px] font-semibold">{user.username}</h1>
          <h3 className="text-white text-[32px] font-medium">
            <span className="text-[16px]">Lv.</span>
            {user.level}
          </h3>
          <div className="flex items-center gap-[24px] mt-[6px]">
            <div className="px-[32px] py-[4px] rounded-full bg-white">
              <p className="text-[14px] text-color1 font-bold">{translateRoleNameToKorean(user.role_data.name)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-[16px]">
        <UserHeaderLikeButton liked={user.liked || false} likesCount={user.likes_count} />
        {userId && (
          <div className="flex gap-[16px] items-center">
            { (user.id === userId || user.chat_blocked) ? null : <UserHeaderChatButton /> }
            { user.id === userId ? null : <UserHeaderReportButton /> }
          </div>
        )}
      </div>
    </div>
  )
}