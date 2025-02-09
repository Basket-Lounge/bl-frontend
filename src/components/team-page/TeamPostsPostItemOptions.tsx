import { deleteTeamPost, editTeamPost, getTeamPostStatus } from "@/api/team.api";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ImageButton from "../common/ImageButton";


interface ITeamPostsPostItemOptionsProps {
  postId: string;
  teamId: string;
  moveBack?: boolean;
}

const TeamPostsPostItemOptions = (
  { postId, teamId, moveBack }: ITeamPostsPostItemOptionsProps
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const teamStatusesQuery = useSuspenseQuery({
    queryKey: ['team', teamId, 'statuses'],
    queryFn: async () => {
      return await getTeamPostStatus();
    },
    staleTime: 86400000,
  });

  const deletePostMutation = useMutation({
    mutationFn: () => {
      return deleteTeamPost(teamId, postId);
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

  const hidePostMutation = useMutation({
    mutationFn: () => {
      return editTeamPost(
        teamId, 
        postId, 
        { 
          status: teamStatusesQuery.data?.find(status => status.name === 'hidden')?.id || 0
        }
      );
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

  const handleDeletePostClick = () => {
    deletePostMutation.mutate();
  }

  const handleHidePostClick = () => {
    hidePostMutation.mutate();
  }

  const handleEditPostClick = () => {
    router.push(`/teams/${teamId}/posts/${postId}/edit`);
  }

  return (
    <div className="bg-color1 text-white rounded-md flex flex-col absolute right-0 top-[100%] z-10 w-max text-center">
      <ImageButton
        className="text-white font-medium p-[16px] hover:bg-color4 text-[14px]"
        onClick={handleDeletePostClick}
        pending={deletePostMutation.isPending}
        disabled={deletePostMutation.isPending || hidePostMutation.isPending}
        aria-label="delete-post-button"
        aria-disabled={deletePostMutation.isPending || hidePostMutation.isPending}
      >
        삭제하기
      </ImageButton>
      <ImageButton
        className="text-white font-medium p-[16px] hover:bg-color4 text-[14px]"
        onClick={handleHidePostClick}
        pending={hidePostMutation.isPending}
        disabled={hidePostMutation.isPending || deletePostMutation.isPending}
        aria-label="hide-post-button"
        aria-disabled={hidePostMutation.isPending || deletePostMutation.isPending}
      >
        숨기기
      </ImageButton>
      <ImageButton
        className="text-white font-medium p-[16px] hover:bg-color4 text-[14px]"
        onClick={handleEditPostClick}
        aria-label="edit-post-button"
        disabled={deletePostMutation.isPending}
        aria-disabled={deletePostMutation.isPending}
      >
        수정하기
      </ImageButton>
    </div>
  );
}

export default TeamPostsPostItemOptions;