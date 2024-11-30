import { createStore, useStore } from "zustand";
import TeamPostsPostCommentsFilter from "./TeamPostsPostCommentsFilter";
import { createContext, useCallback, useEffect } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTeamPostComments } from "@/api/team.api";
import TeamPostsPostCommentsItem from "./TeamPostsPostCommentsItem";
import TeamHeaderLikeButtonSpinner from "./TeamHeaderLikeButtonSpinner";
import TeamPostsPagination from "./TeamPostsPagination";


interface IPostCommentsStore {
  page: number;
  updatePage: (page: number) => void;
  currentCommentsFilterValue: TCommentsFilter;
  updateCurrentCommentsFilterValue: (value: TCommentsFilter) => void;
  postCommentsArgumentsModified: boolean;
  setPostCommentsArgumentsModified: (value: boolean) => void;
}

type TCommentsFilter = "recent" | "oldest" | "popular";

const PostCommentsStore = createStore<IPostCommentsStore>((set) => ({
  page: 1,
  updatePage: (page) => set({ page }),
  currentCommentsFilterValue: "recent",
  updateCurrentCommentsFilterValue: (value) => set({ currentCommentsFilterValue: value }),
  postCommentsArgumentsModified: false,
  setPostCommentsArgumentsModified: (value) => set({ postCommentsArgumentsModified: value }),
}));

export const PostCommentsContext = createContext(PostCommentsStore);


const TeamPostsPostCommentsContainer = () => {
  const { teamId, postId } = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || '1');
  const sort = searchParams.get('sort') || '';

  const postCommentsArgumentsModified = useStore(PostCommentsStore, (state) => state.postCommentsArgumentsModified);
  const setPostCommentsArgumentsModified = useStore(PostCommentsStore, (state) => state.setPostCommentsArgumentsModified);

  const postCommentsQuery = useQuery({
    queryKey: ["team", teamId as string, "posts", postId as string, "comments", page],
    queryFn: async () => {
      return await getTeamPostComments(
        teamId as string, 
        postId as string, 
        page,
        sort
      );
    },
    placeholderData: keepPreviousData,
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const handlePageChange = (newPage: number) => {
    setPostCommentsArgumentsModified(true);
    router.push(pathname + '?' + createQueryString('page', newPage.toString()));
  }

  useEffect(() => {
    if (postCommentsArgumentsModified) {
      postCommentsQuery.refetch();
      setPostCommentsArgumentsModified(false);
    }
  }, [page, sort]);

  if (postCommentsQuery.isLoading || postCommentsQuery.isRefetching) {
    return (
      <div className="p-[24px] flex flex-col gap-[16px] items-center justify-center">
        <TeamHeaderLikeButtonSpinner />
      </div>
    )
  }

  if (postCommentsQuery.isError) {
    return (
      <div className="bg-color3 rounded-md p-[24px] flex items-center justify-center">
        <p className="text-white text-[16px] font-semibold">댓글을 불러오는 중 오류가 발생했습니다.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[16px] item-stretch">
      <TeamPostsPostCommentsFilter 
        count={postCommentsQuery.data?.count || 0} 
      />
      {postCommentsQuery.data?.results.length === 0 && (
        <div className="bg-color3 rounded-md p-[24px]">
          <p className="text-white text-[16px] font-semibold">댓글이 없습니다.</p>
        </div>
      )}
      {postCommentsQuery.data?.results.map((comment) => (
        <TeamPostsPostCommentsItem
          key={comment.id}
          comment={comment}
        />
      ))}
      <TeamPostsPagination
        currentPageNumber={page}
        previousCallback={
          postCommentsQuery.data?.previous ? () => handlePageChange(page - 1) : undefined
        }
        nextCallback={
          postCommentsQuery.data?.next ? () => handlePageChange(page + 1) : undefined
        }
      />
    </div>
  );
}

export default TeamPostsPostCommentsContainer;