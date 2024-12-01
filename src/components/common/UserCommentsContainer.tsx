import { MyPageComment } from "@/models/user.models";
import React from "react";
import CuteErrorMessage from "./CuteErrorMessage";


interface IUserCommentsContainerProps {
  comments: MyPageComment[];
  children?: React.ReactNode;
}

const UserCommentsContainer = ({ comments, children }: IUserCommentsContainerProps) => {
  if (comments.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage error="댓글이 없습니다." />
      </div>
    );
  }

  return (
    <div className="desktop-1:grid grid-cols-2 desktop-1:items-start gap-[24px] items-stretch flex flex-col">
      {children}
    </div>
  );
}

export default UserCommentsContainer;