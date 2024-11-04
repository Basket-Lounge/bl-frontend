'use client'

import Image from "next/image";

interface IUserCommentsContainerItemLikesRepliesBoxProps {
  likesCount: number;
  repliesCount: number;
  liked: boolean;
}

const UserCommentsContainerItemLikesRepliesBox = ({
  likesCount, repliesCount, liked
}: IUserCommentsContainerItemLikesRepliesBoxProps) => {
  return (
    <div className="flex items-center gap-[16px]">
      <div className="flex items-center gap-[16px]">
        {liked ? (
          <Image
            src="/icons/favorite_fill_24dp_FFFFFF.svg"
            width={24}
            height={24}
            alt="likes"
          />
        ) : (
          <Image
            src="/icons/favorite_24dp_FFFFFF.svg"
            width={24}
            height={24}
            alt="likes"
          />
        )}
        <span className="text-white">{likesCount}</span>
      </div>
      <div className="flex items-center gap-[16px]">
        <Image
          src="/icons/comment_24dp_FFFFFF.svg"
          width={24}
          height={24}
          alt="comments"
        />
        <span className="text-white">{repliesCount}</span>
      </div>
    </div>
  );
}

export default UserCommentsContainerItemLikesRepliesBox;