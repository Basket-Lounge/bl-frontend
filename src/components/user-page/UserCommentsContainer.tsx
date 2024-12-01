import { MyPageComment } from "@/models/user.models";
import UserCommentsContainerItem from "./UserCommentsContainerItem";
import CuteErrorMessage from "../common/CuteErrorMessage";


interface IUserCommentsContainerProps {
  comments: MyPageComment[];
}

const UserCommentsContainer = ({ comments }: IUserCommentsContainerProps) => {
  if (comments.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage error="댓글이 없습니다." />
      </div>
    );
  }

  return (
    <div className="desktop-1:grid grid-cols-2 desktop-1:items-start gap-[24px] items-stretch flex flex-col">
      {comments.map((comment) => (
        <UserCommentsContainerItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default UserCommentsContainer;