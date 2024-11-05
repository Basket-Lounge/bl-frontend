'use client'

import { useAuthStore } from "@/stores/auth.stores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useStore } from "zustand";
import TeamHeaderLikeButtonSpinner from "../team-page/TeamHeaderLikeButtonSpinner";
import { likeUser, unlikeUser } from "@/api/user.api";
import { UserLikes } from "@/models/user.models";


interface IUserHeaderLikeButtonProps {
  liked: boolean;
  likesCount: number;
}

export default function UserHeaderLikeButton(
  { liked, likesCount }: IUserHeaderLikeButtonProps
) {
  const { userId } = useParams();
  const [realLikesCount, setRealLikesCount] = useState(likesCount);
  const [realLiked, setRealLiked] = useState(liked);

  const {
    isAuthenticated
  } = useStore(useAuthStore);

  const queryClient = useQueryClient();
  const teamLikeMutation = useMutation<UserLikes>({
    mutationFn: () => {
      if (realLiked) {
        return unlikeUser(parseInt(userId as string));
      }

      return likeUser(parseInt(userId as string));
    },
    onSuccess: (data) => {
      setRealLiked(data.liked ? true : false);
      setRealLikesCount(data.likes_count);
      queryClient.removeQueries({
        queryKey: ["users", userId as string, "user-info"],
      });
    },
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    teamLikeMutation.mutate();
  }

  return (
    <button 
      className="bg-color3 rounded-lg text-[16px] p-[12px] font-medium flex gap-[12px] items-center"
      onClick={handleClick}
      disabled={!isAuthenticated || teamLikeMutation.isPending}
    >
      {realLiked ? (
        <Image
          src={"/icons/favorite_fill_24dp_FFFFFF.svg"}
          alt="favorite"
          width={24}
          height={24}
        />
      ) : (
        <Image
          src={"/icons/favorite_24dp_FFFFFF.svg"}
          alt="favorite"
          width={24}
          height={24}
        />
      )}
      { teamLikeMutation.isPending ?
        <TeamHeaderLikeButtonSpinner /> :
        realLikesCount
      }
    </button>
  )
}