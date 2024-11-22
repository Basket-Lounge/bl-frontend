import { UserChatMessageWithUserData } from "@/models/user.models";
import UserDMsChatHistoryEntry from "./AdminUsersDetailsDMsChatHistoryEntry";


interface IAdminUsersDetailsDMsChatHistoryProps {
  messages: UserChatMessageWithUserData[];
}

const AdminUsersDetailsDMsChatHistory = ({ messages }: IAdminUsersDetailsDMsChatHistoryProps) => {
  if (messages.length === 0) {
    return (
      <div className="h-[500px] flex flex-col items-center justify-center gap-[16px]">
        <p className="font-bold text-[24px]">
          (つ╥﹏╥)つ
        </p>
        <p className="font-bold text-[20px]">
          메시지가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div 
      className="p-[24px] flex flex-col items-stretch gap-[24px] h-[500px] overflow-auto"
    >
      {messages.map((message) => (
        <UserDMsChatHistoryEntry key={message.id} message={message} />
      ))}
    </div>
  )
}

export default AdminUsersDetailsDMsChatHistory;