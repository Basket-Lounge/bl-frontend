import { createStore, useStore } from "zustand";
import TeamPostsPostCommentsFilter from "./TeamPostsPostCommentsFilter";
import { createContext } from "react";
import { useParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTeamPostComments } from "@/api/team.api";
import TeamPostsPostCommentsItem from "./TeamPostsPostCommentsItem";
import TeamPostsPostCommentsPagination from "./TeamPostsPostCommentsPagination";


interface IPostCommentsStore {
  page: number;
  updatePage: (page: number) => void;
  currentCommentsFilterValue: TCommentsFilter;
  updateCurrentCommentsFilterValue: (value: TCommentsFilter) => void;
}

type TCommentsFilter = "recent" | "oldest" | "popular";

const PostCommentsStore = createStore<IPostCommentsStore>((set) => ({
  page: 1,
  updatePage: (page) => set({ page }),
  currentCommentsFilterValue: "recent",
  updateCurrentCommentsFilterValue: (value) => set({ currentCommentsFilterValue: value }),
}));

export const PostCommentsContext = createContext(PostCommentsStore);


const TeamPostsPostCommentsContainer = () => {
  const { teamId, postId } = useParams();
  const page = useStore(PostCommentsStore, (state) => state.page);
  const filter = useStore(PostCommentsStore, (state) => state.currentCommentsFilterValue);

  const postCommentsQuery = useQuery({
    queryKey: ["team", teamId as string, "posts", postId as string, "comments", page, filter],
    queryFn: async () => {
      return await getTeamPostComments(
        teamId as string, 
        postId as string, 
        page,
        filter
      );
    },
    placeholderData: keepPreviousData,
  });

  if (postCommentsQuery.isLoading || postCommentsQuery.isRefetching) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex flex-col gap-[16px] item-stretch">
      <TeamPostsPostCommentsFilter 
        count={postCommentsQuery.data?.count || 0} 
      />
      {postCommentsQuery.data?.results.length === 0 && (
        <div>댓글이 없습니다.</div>
      )}
      {postCommentsQuery.data?.results.map((comment) => (
        <TeamPostsPostCommentsItem
          key={comment.id}
          comment={comment}
        />
      ))}
      <TeamPostsPostCommentsPagination
        previous={postCommentsQuery.data?.previous ? page - 1 : null}
        currentPageNumber={page}
        next={postCommentsQuery.data?.next ? page + 1 : null}
      />
    </div>
  );
}

export default TeamPostsPostCommentsContainer;