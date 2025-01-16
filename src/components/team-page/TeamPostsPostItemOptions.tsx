import { deleteTeamPost } from "@/api/team.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


interface ITeamPostsPostOptionsProps {
  postId: string;
  teamId: string;
}

const TeamPostsPostOptions = (
  { postId, teamId }: ITeamPostsPostOptionsProps
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

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

      router.back();
    }
  });

  const handleDeletePostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deletePostMutation.mutate();
  }

  const handleEditPostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/teams/${teamId}/posts/${postId}/edit`);
  }

  return (
    <div className="bg-color1 text-white rounded-md flex flex-col absolute right-0 top-[100%] z-10 w-max">
      <button 
        className="text-white font-medium p-[16px] hover:bg-color4"
        onClick={handleDeletePostClick}
      >
        삭제하기
      </button>
      <button 
        className="text-white font-medium p-[16px] hover:bg-color4"
        onClick={handleEditPostClick}
      >
        수정하기
      </button>
    </div>
  );
}

export default TeamPostsPostOptions;