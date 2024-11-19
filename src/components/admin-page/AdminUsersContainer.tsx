import { IUser } from "@/models/user.models";
import AdminUsersContainerItem from "./AdminUsersContainerItem";


interface IAdminUsersContainerProps {
  users: IUser[];
}

const AdminUsersContainer = ({ 
  users
}: IAdminUsersContainerProps) => {
  if (users.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <p className="font-bold text-[32px]">
          (つ╥﹏╥)つ
        </p>
        <p className="font-bold text-[24px]">
          유저가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="gap-[24px] items-stretch flex flex-col">
      {users.map((user) => (
        <AdminUsersContainerItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default AdminUsersContainer;