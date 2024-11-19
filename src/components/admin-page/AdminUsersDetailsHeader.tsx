import { IUser } from "@/models/user.models";
import { translateRoleNameToKorean } from "@/utils/user.utils";
import Image from "next/image";
import UserHeaderLikeButton from "../my-page/UserHeaderLikeButton";


interface IAdminUsersDetailsHeaderProps {
  user: IUser;
}

export default function AdminUsersDetailsHeader({ user }: IAdminUsersDetailsHeaderProps) {
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
        <div className="flex flex-col gap-[20px] grow">
          <h1 className="text-white text-[24px] font-semibold">{user.username}</h1>
          <h2 className="text-white text-[20px] font-medium">
            {user.email}
          </h2>
          <h4 className="text-white text-[16px] font-medium">
            가입일: {user.created_at}
          </h4>
          <div className="flex items-center gap-[24px] mt-[6px]">
            <div className="px-[32px] py-[4px] rounded-full bg-white">
              <p className="text-[14px] text-color1 font-bold">{translateRoleNameToKorean(user.role_data.name)}</p>
            </div>
          </div>
        </div>
      </div>
      <UserHeaderLikeButton likesCount={user.likes_count} />
    </div>
  )
}