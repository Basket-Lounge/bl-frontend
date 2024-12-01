import { UserChat } from "@/models/user.models";
import AdminUsersDetailsDMsContainerItem from "./AdminUsersDetailsDMsContainerItem";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getUser } from "@/api/admin.api";
import CuteErrorMessage from "../common/CuteErrorMessage";

interface IAdminUsersDetailsDMsContainerProps {
  chats: UserChat[];
}

const AdminUsersDetailsDMsContainer = ({ chats }: IAdminUsersDetailsDMsContainerProps) => {
  const { userId } = useParams();
  const userQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', 'details', userId as string],
    queryFn: async () => {
      return await getUser(userId as string);
    }
  });

  if (chats.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage error="메시지가 없습니다." />
      </div>
    );
  }

  return (
    <div className="gap-[24px] items-stretch flex flex-col">
      {chats.map((chat) => (
        <AdminUsersDetailsDMsContainerItem
          key={chat.id} 
          chat={chat} 
          username={userQuery.data.username}
        />
      ))}
    </div>
  );
}

export default AdminUsersDetailsDMsContainer;