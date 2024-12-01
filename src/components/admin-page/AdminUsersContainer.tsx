import { IUser } from "@/models/user.models";
import AdminUsersContainerItem from "./AdminUsersContainerItem";
import CuteErrorMessage from "../common/CuteErrorMessage";


interface IAdminUsersContainerProps {
  users: IUser[];
}

const AdminUsersContainer = ({ 
  users
}: IAdminUsersContainerProps) => {
  if (users.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage error="유저가 없습니다." />
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