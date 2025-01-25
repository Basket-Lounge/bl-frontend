'use client'

import { addTeamPostLike, removeTeamPostLike } from "@/api/team.api";
import { TeamPost, TeamPostCommentLikes } from "@/models/team.models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

import { useAuthStore } from "@/stores/auth.stores";
import { useStore } from "zustand";
import ImageButton from "../common/ImageButton";


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

  const {
    isAuthenticated
  } = useStore(useAuthStore);

  const postLikeMutation = useMutation<TeamPostCommentLikes>({
    mutationFn: () => {
      if (liked) {
        return removeTeamPostLike(teamId as string, postId as string);
      }

      return addTeamPostLike(teamId as string, postId as string);
    },
    onSuccess: (data: TeamPostCommentLikes) => {
      queryClient.invalidateQueries({queryKey: ["team", teamId as string, "posts", postId as string, "post"]});
      queryClient.invalidateQueries({queryKey: ["team", teamId as string, "posts", "pagination"],});
      queryClient.invalidateQueries({queryKey: ['my-page', "posts", "pagination"]});
      queryClient.setQueryData(
        ["team", teamId, "posts", postId, "post"],
        (oldData: TeamPost) => {
          return {
            ...oldData,
            likes_count: data.likes_count,
            liked: data.liked
          }
        }
      )
    }
  });

  const handleLikeButtonClick = () => {
    postLikeMutation.mutate();
  }

  return (
    <div className="flex items-center gap-[24px]">
      <ImageButton
        size='small'
        onClick={handleLikeButtonClick}
        disabled={!isAuthenticated}
        aria-disabled={postLikeMutation.isPending}
        pending={postLikeMutation.isPending}
        className="flex items-center text-[16px] gap-[12px] px-[16px] py-[2px] rounded-full border border-white"
      >
        {liked ? (
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
          />
        )}
        <span>{likesCount}</span>
      </ImageButton>
      <ImageButton
        size='small'
        onClick={handleLikeButtonClick}
        disabled={true}
        aria-disabled={true}
        className="flex items-center text-[16px] gap-[12px] px-[16px] py-[2px] rounded-full border border-white"
      >
        <Image
          src='/icons/comment_24dp_FFFFFF.svg'
          alt="avatar"
          width={20}
          height={20}
        />
        <span>{commentsCount}</span>
      </ImageButton>
    </div>
  );
}

export default TeamPostsPostLikeCommentButtonContainer;