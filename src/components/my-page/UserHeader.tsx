import { IUser } from "@/models/user.models";
import { translateRoleNameToKorean } from "@/utils/user.utils";
import Image from "next/image";
import UserHeaderLikeButton from "./UserHeaderLikeButton";
import { useContext } from "react";
import { pageSizeControllerStoreContext } from "../common/PageSizeController";
import { useStore } from "zustand";


interface IUserHeaderProps {
  user: IUser;
}

export default function UserHeader({ user }: IUserHeaderProps) {
  const store = useContext(pageSizeControllerStoreContext);
  const pageWidth = useStore(store, (state) => state.pageWidth);

  return (
    <div className="flex gap-[48px] items-start justify-between">
      {/* Team Logo */}
      <div className="flex gap-[48px] items-start">
        <div className="w-[156px] h-[156px] rounded-full relative">
          { user.favorite_team && (
            <Image
              className="w-auto h-[70%] absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
              src={'/logos/' + user.favorite_team.symbol.toLowerCase() + '.svg'}
              alt="team-logo"
              width={20}
              height={20}
            />
          )}
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
      { pageWidth >= 768 && <UserHeaderLikeButton likesCount={user.likes_count} /> }
    </div>
  )
}