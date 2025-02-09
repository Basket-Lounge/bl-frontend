import { deleteTeamPostCommentReply } from "@/api/team.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ImageButton from "../common/ImageButton";


interface ITeamPostsPostCommentsReplyAuthorOptionsProps {
  postId: string;
  teamId: string;
  commentId: string;
  replyId: string;
}

const TeamPostsPostCommentsReplyAuthorOptions = (
  { postId, teamId, commentId, replyId }: ITeamPostsPostCommentsReplyAuthorOptionsProps
) => {
  const queryClient = useQueryClient();

  const deleteReplyMutation = useMutation({
    mutationFn: () => {
      return deleteTeamPostCommentReply(teamId, postId, commentId, replyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "team", 
          teamId, 
          "posts", 
          postId, 
          "comments", 
          commentId,
          "replies",
        ]
      });
    }
  });

  const handleDeleteCommentClick = () => {
    deleteReplyMutation.mutate();
  }

  return (
    <div className="bg-color1 text-white rounded-md flex flex-col absolute right-0 top-[100%] z-10 w-max">
      <ImageButton 
        onClick={handleDeleteCommentClick}
        disabled={deleteReplyMutation.isPending}
        pending={deleteReplyMutation.isPending}
        aria-label="hide-comment-button"
        aria-disabled={deleteReplyMutation.isPending}
        className="my-[8px] mx-[16px]"
      >
        삭제
      </ImageButton>
    </div>
  );
}

export default TeamPostsPostCommentsReplyAuthorOptions;