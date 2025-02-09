import { hideOrUnhideTeamPostComment } from "@/api/team.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ImageButton from "../common/ImageButton";


interface ITeamPostsPostCommentsItemReaderOptionsProps {
  postId: string;
  teamId: string;
  commentId: string;
}

const TeamPostsPostCommentsItemReaderOptions = (
  { postId, teamId, commentId }: ITeamPostsPostCommentsItemReaderOptionsProps
) => {
  const queryClient = useQueryClient();

  const hideOrUnhideCommentMutation = useMutation({
    mutationFn: () => {
      return hideOrUnhideTeamPostComment(teamId, postId, commentId);
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

  const handleHideCommentClick = () => {
    hideOrUnhideCommentMutation.mutate();
  }

  return (
    <div className="bg-color1 text-white rounded-md flex flex-col absolute right-0 top-[100%] z-10 w-max">
      <ImageButton 
        onClick={handleHideCommentClick}
        disabled={hideOrUnhideCommentMutation.isPending}
        pending={hideOrUnhideCommentMutation.isPending}
        aria-label="hide-comment-button"
        aria-disabled={hideOrUnhideCommentMutation.isPending}
        className="my-[8px] mx-[16px]"
      >
        숨기기
      </ImageButton>
    </div>
  );
}

export default TeamPostsPostCommentsItemReaderOptions;