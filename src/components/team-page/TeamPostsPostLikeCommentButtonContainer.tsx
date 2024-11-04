'use client'

import { addTeamPostLike, removeTeamPostLike } from "@/api/team.api";
import { TeamPostCommentLikes } from "@/models/team.models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import TeamPostsPostCommentsItemLikesButtonSpinner from "./TeamPostsPostCommentsItemLikesButtonSpinner";

import { useAuthStore } from "@/stores/auth.stores";
import { useStore } from "zustand";


interface ITeamPostsPostLikeCommentButtonContainerProps {
  likesCount: number;
  commentsCount: number;
  liked: boolean;
}

const TeamPostsPostLikeCommentButtonContainer = ({
  likesCount, commentsCount, liked
}: ITeamPostsPostLikeCommentButtonContainerProps) => {
  const queryClient = useQueryClient();
  const { teamId, postId } = useParams();
  const [realLikesCount, setRealLikesCount] = useState<number>(likesCount);
  const [realLiked, setRealLiked] = useState<boolean>(liked);

  const {
    isAuthenticated
  } = useStore(useAuthStore);

  const postLikeMutation = useMutation<TeamPostCommentLikes>({
    mutationFn: () => {
      if (realLiked) {
        return removeTeamPostLike(teamId as string, postId as string);
      }

      return addTeamPostLike(teamId as string, postId as string);
    },
    onSuccess: (data) => {
      setRealLikesCount(data.likes_count);
      setRealLiked(data.liked || false);
      queryClient.removeQueries({queryKey: ["team", teamId as string, "posts", postId as string, "post"]});
      queryClient.removeQueries({queryKey: ["team", teamId as string, "posts", "pagination"],});
      queryClient.removeQueries({queryKey: ['my-page', "posts", "pagination"]});
    }
  });

  const handleLikeButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return;
    }

    postLikeMutation.mutate();
  }

  return (
    <div className="flex items-center gap-[24px]">
      <button 
        className="flex items-center text-[16px] gap-[16px] bg-color3 rounded-full py-[8px] px-[16px]"
        onClick={handleLikeButtonClick}
        disabled={postLikeMutation.isPending}
      >
        {realLiked ? (
          <Image
            src='/icons/favorite_fill_24dp_FFFFFF.svg'
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full"
          />
        ) : (
          <Image
            src='/icons/favorite_24dp_FFFFFF.svg'
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full"
          />
        )}
        {postLikeMutation.isPending ? (
          <TeamPostsPostCommentsItemLikesButtonSpinner />
        ) : (
          <span>{realLikesCount}</span>
        )}
      </button>
      <div className="flex items-center text-[16px] gap-[16px] bg-color3 rounded-full py-[8px] px-[16px]">
        <Image
          src='/icons/comment_24dp_FFFFFF.svg'
          alt="avatar"
          width={20}
          height={20}
          className="rounded-full"
        />
        <span>{commentsCount}</span>
      </div>
    </div>
  );
}

export default TeamPostsPostLikeCommentButtonContainer;