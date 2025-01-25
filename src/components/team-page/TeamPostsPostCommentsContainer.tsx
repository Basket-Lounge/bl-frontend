import { createStore, useStore } from "zustand";
import TeamPostsPostCommentsFilter from "./TeamPostsPostCommentsFilter";
import { createContext, useCallback, useEffect } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTeamPostComments } from "@/api/team.api";
import TeamPostsPostCommentsItem from "./TeamPostsPostCommentsItem";
import SpinnerLoading from "../common/SpinnerLoading";
import CuteErrorMessage from "../common/CuteErrorMessage";
import Pagination from "../common/Pagination";


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
    queryKey: ["team", teamId as string, "posts", postId as string, "comments", page, { sort }],
    queryFn: async () => {
      return await getTeamPostComments(
        teamId as string, 
        postId as string, 
        page,
        sort
      );
    },
    placeholderData: keepPreviousData,
    staleTime: 86400000, 
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
      <SpinnerLoading />
    )
  }

  if (postCommentsQuery.isError || postCommentsQuery.data === undefined) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage
          error="댓글을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요."
        />
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-[16px] item-stretch" aria-label="post-comments">
      <TeamPostsPostCommentsFilter 
        count={postCommentsQuery.data?.count || 0} 
      />
      {postCommentsQuery.data?.results.length === 0 && (
        <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
          <CuteErrorMessage
            error="댓글이 없습니다."
          />
        </div>
      )}
      <ul 
        className="flex flex-col items-stretch divide-y-[1px] divide-white/25 border-t-[1px] border-b-[1px] border-white/25"
        aria-label="post-comments-list"
      >
        {postCommentsQuery.data?.results.map((comment) => (
          <TeamPostsPostCommentsItem
            key={comment.id}
            comment={comment}
          />
        ))}
      </ul>
      <Pagination
        currentPageNumber={postCommentsQuery.data.current_page || 1}
        lastPageNumber={postCommentsQuery.data.last_page}
        firstPageCallback={
          () => handlePageChange(1)
        }
        previousCallback={
          postCommentsQuery.data.previous ?
            () => handlePageChange(page - 1) :
            undefined
        }
        nextCallback={
          postCommentsQuery.data.next ?
            () => handlePageChange(page + 1) :
            undefined
        }
        lastPageCallback={
          () => handlePageChange(postCommentsQuery.data.last_page)
        }
        disabled={
          (postCommentsQuery.data.next === null && postCommentsQuery.data.previous === null) ||
          (postCommentsQuery.isLoading || postCommentsQuery.isRefetching)
        }
      />
    </section>
  );
}

export default TeamPostsPostCommentsContainer;