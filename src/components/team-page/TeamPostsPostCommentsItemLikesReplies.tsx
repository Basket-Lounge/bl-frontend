import Image from "next/image";
import TeamPostsPostCommentsItemLikesButtonSpinner from "./TeamPostsPostCommentsItemLikesButtonSpinner";
import { TeamPostCommentLikes } from "@/models/team.models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeTeamPostComment, unlikeTeamPostComment } from "@/api/team.api";
import { useParams } from "next/navigation";
import { PostCommentsContext } from "./TeamPostsPostCommentsContainer";
import { useContext, useEffect, useState } from "react";
import { useStore } from "zustand";
import { PostCommentReplyContext } from "./TeamPostsPostCommentsItem";
import { useAuthStore } from "@/stores/auth.stores";


interface ITeamPostsPostCommentsItemLikesRepliesButtonsContainerProps {
  isLiked: boolean;
  commentId: string;
}


const TeamPostsPostCommentsItemLikesRepliesButtonsContainer = ({
  isLiked,
  commentId
}: ITeamPostsPostCommentsItemLikesRepliesButtonsContainerProps) => {
  const { teamId, postId } = useParams();
  const queryClient = useQueryClient();

  const [liked, setLiked] = useState<boolean>(isLiked);

  const store = useContext(PostCommentReplyContext);

  if (!store) {
    throw new Error("PostCommentReplyContext is not found");
  }

  const {
    likesCount,
    updateLikesCount,
    repliesCount,
    isReplyOpen,
    updateIsReplyOpen,
    setNoRefresh,
  } = useStore(store);

  const {
    isAuthenticated
  } = useStore(useAuthStore);

  const PostCommentsStore = useContext(PostCommentsContext);
  const page = useStore(PostCommentsStore, (state) => state.page);

  const likeMutation = useMutation<TeamPostCommentLikes>({
    mutationFn: () => {
      if (!liked) {
        return likeTeamPostComment(
          teamId as string, 
          postId as string, 
          commentId
        )
      }

      return unlikeTeamPostComment(
        teamId as string, 
        postId as string, 
        commentId
      )
    },
    onSuccess: (data) => {
      updateLikesCount(data.likes_count);
      setLiked(data.liked || false);
      queryClient.removeQueries({
        queryKey: ["team", teamId as string, "posts", postId as string, "comments", page]
      });
    }
  })

  const handleReplyButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Load replies for the first time when the reply button is clicked
    if (isReplyOpen === false) {
      setNoRefresh(true);
    }

    updateIsReplyOpen(!isReplyOpen);
  }

  // For clicking the like button
  const handleLikeButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return;
    }

    likeMutation.mutate();
  }

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  return (
    <div className="flex items-center gap-[24px]">
      <button 
        className="flex gap-[16px] items-center"
        onClick={handleLikeButtonClick}
        disabled={likeMutation.isPending}
      >
        {isLiked ? (
          <Image
            src="/icons/favorite_fill_24dp_FFFFFF.svg"
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full"
          />
        ) : (
          <Image
            src="/icons/favorite_border_24dp_FFFFFF.svg"
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full"
          />
        )}
        {likeMutation.isPending ? (
          <TeamPostsPostCommentsItemLikesButtonSpinner />
        ) : (
          <span className="text-white">{likesCount}</span>
        )}
      </button>
      <button 
        className="flex gap-[16px] items-center"
        onClick={handleReplyButtonClick}
      >
        <Image
          src="/icons/comment_24dp_FFFFFF.svg"
          alt="avatar"
          width={20}
          height={20}
          className="rounded-full"
        />
        <span className="text-white">{repliesCount}</span>
      </button>
    </div>
  );
}

export default TeamPostsPostCommentsItemLikesRepliesButtonsContainer;