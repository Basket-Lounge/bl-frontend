import { 
  getTeamPostCommentReplies, 
} from "@/api/team.api";
import { TeamPostComment} from "@/models/team.models";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import TeamPostsPostCommentsReply from "./TeamPostsPostCommentsReply";
import TeamPostsPostCommentsReplyInput from "./TeamPostsPostCommentsReplyInput";
import { PostCommentReplyContext } from "./TeamPostsPostCommentsItem";
import { useStore } from "zustand";
import Pagination from "../common/Pagination";
import SpinnerLoading from "../common/SpinnerLoading";


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
    <div className="flex flex-col gap-[24px] items-stretch">
      <TeamPostsPostCommentsReplyInput
        commentId={comment.id}
      />
      {( postCommentRepliesQuery.isLoading || postCommentRepliesQuery.isRefetching ) && (
        <SpinnerLoading />
      )}
      {( postCommentRepliesQuery.isSuccess && isReplyOpen ) && (
        <ul className="flex flex-col items-stretch divide-y-[1px] divide-white/25 pl-[24px]">
          {postCommentRepliesQuery.data.results.map((reply) => (
            <TeamPostsPostCommentsReply
              key={reply.id}
              reply={reply}
            />
          ))}
        </ul>
      )}
      {( postCommentRepliesQuery.isSuccess && isReplyOpen ) && (
        <Pagination
          currentPageNumber={postCommentRepliesQuery.data.current_page}
          firstPageCallback={() => handlePagination(postCommentRepliesQuery.data.first_page)}
          previousCallback={postCommentRepliesQuery.data.previous ? () => handlePagination(repliesPage - 1) : undefined}
          nextCallback={postCommentRepliesQuery.data.next ? () => handlePagination(repliesPage + 1) : undefined}
          lastPageCallback={() => handlePagination(postCommentRepliesQuery.data.last_page)}
          lastPageNumber={postCommentRepliesQuery.data.last_page}
          disabled={postCommentRepliesQuery.isLoading || postCommentRepliesQuery.isRefetching}
        />
      )}
    </div>
  );
}

export default TeamPostsPostCommentsItemRepliesContainer;