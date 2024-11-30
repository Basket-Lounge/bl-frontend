import { 
  getTeamPostCommentReplies, 
} from "@/api/team.api";
import { TeamPostComment} from "@/models/team.models";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import TeamPostsPostCommentsReply from "./TeamPostsPostCommentsReply";
import TeamPostsPostCommentsReplyInput from "./TeamPostsPostCommentsReplyInput";
import TeamPostsPostCommentsReplyPagination from "./TeamPostsPostCommentsReplyPagination";
import { PostCommentReplyContext } from "./TeamPostsPostCommentsItem";
import { useStore } from "zustand";


const TeamPostsPostCommentsItemRepliesContainer = ({
  comment
}: {comment: TeamPostComment}) => {
  const { teamId, postId } = useParams();

  const store = useContext(PostCommentReplyContext);
  if (!store) {
    throw new Error("PostCommentReplyContext is not found");
  }

  const {
    repliesPage,
    updateRepliesPage,
    updateRepliesCount,
    noRefresh,
    isReplyOpen,
    replyAdded,
    updateReplyAdded,
  } = useStore(store);

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
      updateRepliesCount(replies.count);
      return replies;
    },
    enabled: noRefresh,
  });

  // For handling pagination of replies
  const handlePagination = (pageNumber: number) => {
    updateRepliesPage(pageNumber);
    postCommentRepliesQuery.refetch();
  }

  useEffect(() => {
    if (replyAdded) {
      updateReplyAdded(false);
      postCommentRepliesQuery.refetch();
    }
  }, [replyAdded]);

  return (
    <div className="flex flex-col gap-[24px] items-stretch rounded-md bg-color3">
      <TeamPostsPostCommentsReplyInput
        commentId={comment.id}
      />
      {( postCommentRepliesQuery.isLoading || postCommentRepliesQuery.isRefetching ) && (
        <div className="h-[150px] animate-pulse bg-color4 rounded-md" />
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

export default TeamPostsPostCommentsItemRepliesContainer;