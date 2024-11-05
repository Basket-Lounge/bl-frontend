import { UserChatMessage, UserChatMessageWithUserData } from "@/models/user.models";
import UserDMsChatHistoryEntry from "./UserDMsChatHistoryEntry";


interface IUserDMsChatHistoryProps {
  messages: UserChatMessageWithUserData[];
}

const UserDMsChatHistory = ({ messages }: IUserDMsChatHistoryProps) => {
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
    <div className="p-[24px] flex flex-col items-stretch justify-end gap-[24px] h-[500px]">
      {messages.map((message) => (
        <UserDMsChatHistoryEntry key={message.id} message={message} />
      ))}
    </div>
  )
}

export default UserDMsChatHistory;