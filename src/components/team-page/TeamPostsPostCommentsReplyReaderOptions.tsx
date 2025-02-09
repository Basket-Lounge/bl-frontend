import { hideOrUnhideTeamPostCommentReply } from "@/api/team.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ImageButton from "../common/ImageButton";


interface ITeamPostsPostCommentsReplyReaderOptionsProps {
  postId: string;
  teamId: string;
  commentId: string;
  replyId: string;
}

const TeamPostsPostCommentsReplyReaderOptions = (
  { postId, teamId, commentId, replyId }: ITeamPostsPostCommentsReplyReaderOptionsProps
) => {
  const queryClient = useQueryClient();

  const hideOrUnhideReplyMutation = useMutation({
    mutationFn: () => {
      return hideOrUnhideTeamPostCommentReply(teamId, postId, commentId, replyId);
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

  const handleHideCommentClick = () => {
    hideOrUnhideReplyMutation.mutate();
  }

  return (
    <div className="bg-color1 text-white rounded-md flex flex-col absolute right-0 top-[100%] z-10 w-max">
      <ImageButton 
        onClick={handleHideCommentClick}
        disabled={hideOrUnhideReplyMutation.isPending}
        pending={hideOrUnhideReplyMutation.isPending}
        aria-label="hide-comment-button"
        aria-disabled={hideOrUnhideReplyMutation.isPending}
        className="my-[8px] mx-[16px]"
      >
        숨기기
      </ImageButton>
    </div>
  );
}

export default TeamPostsPostCommentsReplyReaderOptions;