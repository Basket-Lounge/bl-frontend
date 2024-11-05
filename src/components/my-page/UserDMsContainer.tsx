import { UserChat } from "@/models/user.models";
import UserDMsContainerItem from "./UserDMsContainerItem";

interface IUserDMsContainerProps {
  chats: UserChat[];
}

const UserDMsContainer = ({ chats }: IUserDMsContainerProps) => {
  if (chats.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <p className="font-bold text-[32px]">
          (つ╥﹏╥)つ
        </p>
        <p className="font-bold text-[24px]">
          포스트가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="gap-[24px] items-stretch flex flex-col">
      {chats.map((chat) => (
        <UserDMsContainerItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
}

export default UserDMsContainer;