'use client'

import { MyPageComment } from "@/models/user.models";
import UserCommentsContainerContent from "../my-page/UserCommentsContainerContent";
import UserCommentsContainerItemLikesRepliesBox from "../my-page/UserCommentsContainerItemLikesRepliesBox";


interface IUserCommentsContainerItemProps {
  comment: MyPageComment;
}

const UserCommentsContainerItem = ({ comment }: IUserCommentsContainerItemProps) => {
  return (
    <div className="flex flex-col items-stretch gap-[24px] bg-color3 rounded-md p-[24px]">
      <UserCommentsContainerContent
        content={comment.content}
        teamId={comment.post_data.team_data.id.toString()}
        postId={comment.post_data.id}
      />
      <hr className="border border-white opacity-[25%]" />
      <div className="flex justify-between items-center gap-[16px]">
        <p className="text-white text-[16px] font-semibold line-clamp-1">{comment.post_data.title}</p>
      </div>
      <div className="flex items-center gap-[16px]">
        <div className="p-[20px] rounded-full bg-white"></div>
        <span className="text-white text-[14px] line-clamp-1">
          {comment.post_data.user_data.username}
        </span>
      </div>
      <UserCommentsContainerItemLikesRepliesBox
        likesCount={comment.likes_count}
        repliesCount={comment.replies_count}
        liked={comment.liked || false}
      />
    </div>
  );
}

export default UserCommentsContainerItem;