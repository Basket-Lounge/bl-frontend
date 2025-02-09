import { hideOrUnhideTeamPost } from "@/api/team.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ImageButton from "../common/ImageButton";


interface ITeamPostsPostItemReaderOptionsProps {
  teamId: string;
  postId: string;
  moveBack?: boolean;
}

const TeamPostsPostItemReaderOptions = (
  { postId, teamId, moveBack }: ITeamPostsPostItemReaderOptionsProps
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const hidePostMutation = useMutation({
    mutationFn: () => {
      return hideOrUnhideTeamPost(teamId, postId);
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

      if (moveBack)
        router.back();
    }
  });

  const handleHidePostClick = () => {
    hidePostMutation.mutate();
  }

  return (
    <div className="bg-color1 text-white rounded-md flex flex-col absolute right-0 top-[100%] z-10 w-max">
      <ImageButton
        className="text-white font-medium p-[16px] hover:bg-color4 text-[14px]"
        onClick={handleHidePostClick}
        pending={hidePostMutation.isPending}
        disabled={hidePostMutation.isPending}
        aria-label="hide-post-button"
        aria-disabled={hidePostMutation.isPending}
      >
        숨기기
      </ImageButton>
    </div>
  );
}

export default TeamPostsPostItemReaderOptions;