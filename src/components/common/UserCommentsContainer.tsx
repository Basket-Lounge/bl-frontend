import { MyPageComment } from "@/models/user.models";
import React from "react";


interface IUserCommentsContainerProps {
  comments: MyPageComment[];
  children?: React.ReactNode;
}

const UserCommentsContainer = ({ comments, children }: IUserCommentsContainerProps) => {
  if (comments.length === 0) {
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
    <div className="desktop-1:grid grid-cols-2 desktop-1:items-start gap-[24px] items-stretch flex flex-col">
      {children}
    </div>
  );
}

export default UserCommentsContainer;