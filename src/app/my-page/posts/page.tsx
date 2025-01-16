'use client'

import { getMyPosts } from "@/api/user.api";
import CuteErrorMessage from "@/components/common/CuteErrorMessage";
import Pagination from "@/components/common/Pagination";
import UserPostsContainer from "@/components/my-page/UserPostsContainer";
import UserPostsFilter from "@/components/my-page/UserPostsFilter";
import TeamPostsContainerSkeleton from "@/components/team-page/TeamPostsContainerSkeleton";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import { useStore } from "zustand";


const PostsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const store = useContext(MyPageStoreContext);
  const lastModifiedPostId = useStore(store, (state) => state.lastModifiedPostId);
  const setLastModifiedPostId = useStore(store, (state) => state.setLastModifiedPostId);
  const postArgumentsModified = useStore(store, (state) => state.postArgumentsModified);
  const setPostArgumentsModified = useStore(store, (state) => state.setPostArgumentsModified);

  const sort = searchParams.get('sort') || '';
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get("page") || '1');

  const teamPostsQuery = useQuery({
    queryKey: ['my-page', "posts", "pagination", page, { sort, search }],
    queryFn: async () => {
      return await getMyPosts(page, { sort, search });
    },
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
    setPostArgumentsModified(true);
    router.push(pathname + '?' + createQueryString('page', newPage.toString()));
  }

  useEffect(() => {
    if (lastModifiedPostId) {
      teamPostsQuery.refetch();
      setLastModifiedPostId(null);
    }
  }, [lastModifiedPostId]);

  useEffect(() => {
    if (postArgumentsModified) {
      teamPostsQuery.refetch();
      setPostArgumentsModified(false);
    }
  }, [search, sort, page]);

  if (teamPostsQuery.isLoading || teamPostsQuery.isRefetching) {
    return (
      <div className="flex flex-col gap-[16px] items-stretch">
        <UserPostsFilter />
        <TeamPostsContainerSkeleton />
      </div>
    );
  }

  if (teamPostsQuery.isError) {
    return (
      <CuteErrorMessage 
        error="포스트를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요"
      />
    );
  }

  return (
    <div className="flex flex-col gap-[16px] items-stretch">
      <UserPostsFilter />
      <UserPostsContainer posts={teamPostsQuery.data!.results} />
      <Pagination
        currentPageNumber={page}
        lastPageNumber={teamPostsQuery.data!.last_page}
        firstPageCallback={() => handlePageChange(teamPostsQuery.data!.first_page)}
        previousCallback={
          teamPostsQuery.data!.previous ? () => handlePageChange(page - 1) : undefined
        }
        nextCallback={
          teamPostsQuery.data!.next ? () => handlePageChange(page + 1) : undefined
        }
        lastPageCallback={() => handlePageChange(teamPostsQuery.data!.last_page)}
        disabled={teamPostsQuery.isLoading || teamPostsQuery.isRefetching}
      />
    </div>
  );
}

export default PostsPage;