'use client'

import { getMyPosts } from "@/api/user.api";
import UserPostsFilter from "@/components/my-page/UserPostsFilter";
import TeamPostsContainer from "@/components/team-page/TeamPostsContainer";
import TeamPostsContainerSkeleton from "@/components/team-page/TeamPostsContainerSkeleton";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
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
  const postArgumentsModified = useStore(store, (state) => state.postArgumentsModified);
  const setPostArgumentsModified = useStore(store, (state) => state.setPostArgumentsModified);

  const sort = searchParams.get('sort') || '';
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get("page") || '1');

  const teamPostsQuery = useQuery({
    queryKey: ['my-page', "posts", "pagination", page],
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
      <div className="flex flex-col gap-[16px] items-stretch">
        <p className="font-bold text-[32px]">
          (つ╥﹏╥)つ
        </p>
        <p className="font-bold text-[20px]">
          포스트를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[16px] items-stretch">
      <UserPostsFilter />
      <TeamPostsContainer posts={teamPostsQuery.data!.results} />
      <TeamPostsPagination 
        currentPageNumber={page}
        previousCallback={
          teamPostsQuery.data!.previous ? () => handlePageChange(page - 1) : undefined
        }
        nextCallback={
          teamPostsQuery.data!.next ? () => handlePageChange(page + 1) : undefined
        }
      />
    </div>
  );
}

export default PostsPage;