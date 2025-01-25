import { useMutation, useQueryClient } from "@tanstack/react-query";
import TextButton from "../common/TextButton";
import { hideOrUnhideTeamPost } from "@/api/team.api";
import { useSearchParams } from "next/navigation";


interface ITeamPostsContainerItemActionPopoverContainerProps {
  teamId: string;
  postId: string;
}

const TeamPostsContainerItemActionPopoverContainer = (
  {teamId, postId}: ITeamPostsContainerItemActionPopoverContainerProps
) => {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const search = searchParams.get('search') || '';

  const queryClient = useQueryClient();
  const hidePostMutation = useMutation({
    mutationFn: () => {
      return hideOrUnhideTeamPost(teamId, postId);
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

  const handleHidePost = () => {
    hidePostMutation.mutate();
  }

  return (
    <div className="flex flex-col items-start bg-white rounded-md text-color1">
      <TextButton 
        text="숨기기"
        size="small"
        className="p-[16px] font-medium"
        handleClick={handleHidePost}
        disabled={hidePostMutation.isPending}
        pending={hidePostMutation.isPending}
        aria-label="hide-post"
      />
    </div>
  );
}

export default TeamPostsContainerItemActionPopoverContainer;