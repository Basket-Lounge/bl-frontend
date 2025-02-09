import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { editTeamPost, getTeamPostStatus } from "@/api/team.api";
import { useRouter, useSearchParams } from "next/navigation";
import ImageButton from "../common/ImageButton";


interface ITeamPostsContainerItemAuthorActionPopoverContainerProps {
  teamId: string;
  postId: string;
}

const TeamPostsContainerItemAuthorActionPopoverContainer = (
  {teamId, postId}: ITeamPostsContainerItemAuthorActionPopoverContainerProps
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const search = searchParams.get('search') || '';

  const teamStatusesQuery = useSuspenseQuery({
    queryKey: ['team', teamId, 'statuses'],
    queryFn: async () => {
      return await getTeamPostStatus();
    },
    staleTime: 86400000,
  });

  const queryClient = useQueryClient();
  const deletePostMutation = useMutation({
    mutationFn: () => {
      return editTeamPost(
        teamId,
        postId,
        {
          status: teamStatusesQuery.data?.find(status => status.name === 'deleted')?.id || 0
        }
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        predicate(query) {
          if (query.queryKey.length < 6) {
            return false;
          }

          const isTeamPostsQuery = query.queryKey[0] === 'team' &&
            query.queryKey[1] === teamId &&
            query.queryKey[2] === 'posts' &&
            query.queryKey[3] === 'pagination' &&
            typeof query.queryKey[4] === 'number'
          
          if (!isTeamPostsQuery) {
            return false;
          }

          const { 
            sort: querySort, 
            search: querySearch 
          } = query.queryKey[5] as { sort: string, search: string };
          return querySort === sort && querySearch === search;
        },
      });
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
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        predicate(query) {
          if (query.queryKey.length < 6) {
            return false;
          }

          const isTeamPostsQuery = query.queryKey[0] === 'team' &&
            query.queryKey[1] === teamId &&
            query.queryKey[2] === 'posts' &&
            query.queryKey[3] === 'pagination' &&
            typeof query.queryKey[4] === 'number'
          
          if (!isTeamPostsQuery) {
            return false;
          }

          const { 
            sort: querySort, 
            search: querySearch 
          } = query.queryKey[5] as { sort: string, search: string };
          return querySort === sort && querySearch === search;
        },
      });
    }
  });

  const handleDeletePost = () => {
    deletePostMutation.mutate();
  }

  const handleHidePost = () => {
    hidePostMutation.mutate();
  }

  const handleEditPostClick = () => {
    router.push(`/teams/${teamId}/posts/${postId}/edit`);
  }

  return (
    <div className="flex flex-col items-stretch bg-color1 rounded-md text-white">
      <ImageButton
        className="text-white font-medium p-[16px] hover:bg-color4 text-[14px]"
        handleClick={handleDeletePost}
        disabled={deletePostMutation.isPending || hidePostMutation.isPending}
        pending={deletePostMutation.isPending}
        aria-label="delete-post"
      >
        삭제하기
      </ImageButton>
      <ImageButton 
        className="text-white font-medium p-[16px] hover:bg-color4 text-[14px]"
        handleClick={handleHidePost}
        disabled={hidePostMutation.isPending || deletePostMutation.isPending}
        pending={hidePostMutation.isPending}
        aria-label="hide-post"
      >
        숨기기
      </ImageButton>
      <ImageButton
        className="text-white font-medium p-[16px] hover:bg-color4 text-[14px]"
        handleClick={handleEditPostClick}
        disabled={deletePostMutation.isPending || hidePostMutation.isPending}
        aria-label="edit-post"
      >
        수정하기
      </ImageButton>
    </div>
  );
}

export default TeamPostsContainerItemAuthorActionPopoverContainer;