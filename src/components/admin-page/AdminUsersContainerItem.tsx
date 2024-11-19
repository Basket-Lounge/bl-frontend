import { IUser } from "@/models/user.models";
import { translateRoleNameToKorean } from "@/utils/user.utils";
import { usePathname, useRouter } from "next/navigation";


interface IAdminUsersContainerItemProps {
  user: IUser;
}

const AdminUsersContainerItem = ({ user }: IAdminUsersContainerItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const userRoleInKorean = translateRoleNameToKorean(user.role_data.name);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.push(pathname + "/" + user.id);
  }

  return (
    <div 
      className={"p-[24px] rounded-md flex items-center justify-between bg-color3"}
      onClick={handleClick}
    >
      <div className="flex gap-[24px] items-center">
        <div className="w-[64px] h-[64px] rounded-full bg-white"></div>
        <div className="flex flex-col gap-[12px] items-start">
          <p className="font-semibold text-[16px]">{user.username}</p>
          <div className="px-[32px] py-[2px] bg-white rounded-full text-color1 text-[14px] font-semibold">{userRoleInKorean}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsersContainerItem;