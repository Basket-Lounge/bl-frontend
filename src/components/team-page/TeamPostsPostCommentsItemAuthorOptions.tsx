import { deleteTeamPostComment } from "@/api/team.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ImageButton from "../common/ImageButton";


interface ITeamPostsPostCommentsItemAuthorOptionsProps {
  postId: string;
  teamId: string;
  commentId: string;
}

const TeamPostsPostCommentsItemAuthorOptions = (
  { postId, teamId, commentId }: ITeamPostsPostCommentsItemAuthorOptionsProps
) => {
  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: () => {
      return deleteTeamPostComment(teamId, postId, commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["team", teamId, "posts", postId, "post"]
      });
      queryClient.invalidateQueries({
        queryKey: ["team", teamId, "posts", "pagination"]
      });
      queryClient.invalidateQueries({
        queryKey: ['my-page', "posts", "pagination"],
      })
      queryClient.invalidateQueries({
        queryKey: ["team", teamId, "posts", postId, "comments"]
      });
    }
  });

  const handleDeleteCommentClick = () => {
    deleteCommentMutation.mutate();
  }

  return (
    <div className="bg-color1 text-white rounded-md flex flex-col absolute right-0 top-[100%] z-10 w-max">
      <ImageButton 
        onClick={handleDeleteCommentClick}
        disabled={deleteCommentMutation.isPending}
        pending={deleteCommentMutation.isPending}
        aria-label="hide-comment-button"
        aria-disabled={deleteCommentMutation.isPending}
        className="my-[8px] mx-[16px]"
      >
        삭제
      </ImageButton>
    </div>
  );
}

export default TeamPostsPostCommentsItemAuthorOptions;