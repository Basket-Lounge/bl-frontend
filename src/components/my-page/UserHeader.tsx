import { IUser } from "@/models/user.models";
import { translateRoleNameToKorean } from "@/utils/user.utils";
import Image from "next/image";


interface IUserHeaderProps {
  user: IUser;
}

export default function UserHeader({ user }: IUserHeaderProps) {
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
              <p className="text-[14px] text-color1 font-bold">{translateRoleNameToKorean(user.role.name)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-color3 rounded-lg text-[16px] p-[12px] font-medium flex gap-[12px]">
        <Image
          src={"/icons/favorite_border_24dp_FFFFFF.svg"}
          alt="favorite"
          width={24}
          height={24}
        />
        24
      </div>
    </div>
  )
}