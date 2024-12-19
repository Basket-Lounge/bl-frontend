import { IUser } from "@/models/user.models";
import { translateRoleNameToKorean } from "@/utils/user.utils";
import Image from "next/image";


interface IAdminHeaderProps {
  user: IUser;
}

export default function AdminHeader({ user }: IAdminHeaderProps) {
  const role = translateRoleNameToKorean(user.role_data.name);

  return (
    <section className="flex gap-[48px] items-start justify-between">
      {/* Team Logo */}
      <div className="flex gap-[48px] items-stretch">
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
        <div className="flex flex-col grow justify-between py-[32px]">
          <h1 className="text-white text-[24px] font-semibold">{user.username}</h1>
          <h3 className="text-white text-[24px] font-medium">
            {role}
          </h3>
        </div>
      </div>
    </section>
  )
}