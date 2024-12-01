import { UserChatMessageWithUserData } from "@/models/user.models";
import UserDMsChatHistoryEntry from "./AdminUsersDetailsDMsChatHistoryEntry";
import CuteErrorMessage from "../common/CuteErrorMessage";


interface IAdminUsersDetailsDMsChatHistoryProps {
  messages: UserChatMessageWithUserData[];
}

const AdminUsersDetailsDMsChatHistory = ({ messages }: IAdminUsersDetailsDMsChatHistoryProps) => {
  if (messages.length === 0) {
    return (
      <div className="h-[500px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage error="메시지가 없습니다." />
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