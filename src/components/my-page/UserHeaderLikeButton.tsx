'use client'

import Image from "next/image";

interface IUserHeaderLikeButtonProps {
  likesCount: number;
}

export default function UserHeaderLikeButton(
  { likesCount }: IUserHeaderLikeButtonProps
) {

  return (
    <div
      className="bg-color3 rounded-lg text-[16px] p-[12px] font-medium flex gap-[12px] items-center"
    >
      <Image
        src={"/icons/favorite_24dp_FFFFFF.svg"}
        alt="favorite"
        width={24}
        height={24}
      />
      <span>{likesCount}</span>
    </div>
  )
}