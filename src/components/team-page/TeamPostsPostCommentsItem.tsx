import { 
  getTeamPostCommentReplies, 
  likeTeamPostComment, 
  publishTeamPostCommentReply, 
  unlikeTeamPostComment 
} from "@/api/team.api";
import { useAuthStore } from "@/stores/auth.stores";
import { TeamPostComment, TeamPostCommentLikes } from "@/models/team.models";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useStore } from "zustand";
import TeamPostsPostCommentsReply from "./TeamPostsPostCommentsReply";
import TeamPostsPostCommentsItemUser from "./TeamPostsPostCommentsItemUser";
import TeamPostsPostCommentsItemLikesRepliesButtonsContainer from "./TeamPostsPostCommentsItemLikesReplies";
import TeamPostsPostCommentsReplyInput from "./TeamPostsPostCommentsReplyInput";
import TeamPostsPostCommentsReplyPagination from "./TeamPostsPostCommentsReplyPagination";


const TeamPostsPostCommentsItem = ({
  comment
}: {comment: TeamPostComment}) => {
  const { teamId, postId } = useParams();
  const [ noRefresh, setNoRefresh ] = useState<boolean>(false);
  const [ realComment, setRealComment ] = useState<TeamPostComment>(comment);
  const [ isReplyOpen, setIsReplyOpen ] = useState<boolean>(false);

  const [ liked , setLiked ] = useState<boolean>(comment.liked || false);
  const [ likesCount, setLikesCount ] = useState<number>(comment.likes_count);
  const [ repliesCount, setRepliesCount ] = useState<number>(comment.replies_count);
  const [ repliesPage, setRepliesPage ] = useState<number>(1);

  const {
    isAuthenticated
  } = useStore(useAuthStore);

  // For fetching replies to a comment
  const postCommentRepliesQuery = useQuery({
    queryKey: [
      "team", 
      teamId as string, 
      "posts", 
      postId as string, 
      "comments", 
      comment.id,
      "replies",
      repliesPage
    ],
    queryFn: async () => {
      const replies = await getTeamPostCommentReplies(
        teamId as string, 
        postId as string, 
        comment.id,
        repliesPage
      );
      setRepliesCount(replies.count);

      return replies;
    },
    enabled: noRefresh,
  });

  // For liking a comment
  const likeMutation = useMutation<TeamPostCommentLikes>({
    mutationFn: () => {
      if (!liked) {
        return likeTeamPostComment(
          teamId as string, 
          postId as string, 
          comment.id
        )
      }

      return unlikeTeamPostComment(
        teamId as string, 
        postId as string, 
        comment.id
      )
    },
    onSuccess: (data) => {
      setLikesCount(data.likes_count);
      setLiked(data.liked || false);
    }
  })

  // For submitting a reply to a comment
  const replyMutation = useMutation({
    mutationFn: (reply: string) => {
      return publishTeamPostCommentReply(
        teamId as string, 
        postId as string, 
        comment.id,
        reply
      )
    },
    onSuccess: () => {
      postCommentRepliesQuery.refetch();
    }
  })

  const handleLikeButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return;
    }

    likeMutation.mutate();
  }

  const handleReplyButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Load replies for the first time when the reply button is clicked
    if (isReplyOpen === false) {
      setNoRefresh(true);
    }

    setIsReplyOpen(!isReplyOpen);
  }

  const handlePagination = (pageNumber: number) => {
    setRepliesPage(pageNumber);
    postCommentRepliesQuery.refetch();
  }

  return (
    <div className="flex flex-col gap-[24px] items-stretch rounded-md bg-color3 p-[24px]">
      <TeamPostsPostCommentsItemUser userData={realComment.user_data} />
      <p className="text-white text-[14px] leading-4">{realComment.content}</p>
      <TeamPostsPostCommentsItemLikesRepliesButtonsContainer
        likesCount={likesCount}
        repliesCount={repliesCount}
        handleReplyButtonClick={handleReplyButtonClick}
        handleLikeButtonClick={handleLikeButtonClick}
        isMutating={likeMutation.isPending}
        isLiked={liked}
      />
      {isReplyOpen && (
        <TeamPostsPostCommentsReplyInput
          isMutating={replyMutation.isPending}
          handleMutation={(reply: string) => {
            replyMutation.mutate(reply);
          }}
        />
      )}
      {( postCommentRepliesQuery.isLoading || postCommentRepliesQuery.isRefetching ) && (
        <div>로딩중...</div>
      )}
      {( postCommentRepliesQuery.isSuccess && isReplyOpen ) && 
        postCommentRepliesQuery.data.results.map((reply) => (
        <TeamPostsPostCommentsReply
          key={reply.id}
          reply={reply}
        />
      ))}
      {( postCommentRepliesQuery.isSuccess && isReplyOpen ) && (
        <TeamPostsPostCommentsReplyPagination
          currentPageNumber={repliesPage}
          previousLink={postCommentRepliesQuery.data.previous}
          nextLink={postCommentRepliesQuery.data.next}
          setPageNumber={handlePagination}
        />
      )}
    </div>
  );
}

export default TeamPostsPostCommentsItem;