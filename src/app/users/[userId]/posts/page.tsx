'use client'

import { getUserPosts } from "@/api/user.api";
import TeamPostsContainer from "@/components/team-page/TeamPostsContainer";
import TeamPostsContainerSkeleton from "@/components/team-page/TeamPostsContainerSkeleton";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import UserPostsFilter from "@/components/user-page/UserPostsFilter";
import { UserStoreContext } from "@/stores/users.stores";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import { useStore } from "zustand";


export default function UserPostsPage() {
  const { userId } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || '1');
  const sort = searchParams.get('sort') || '';
  const search = searchParams.get('search') || '';

  const store = useContext(UserStoreContext);
  const postsArgumentsModified = useStore(store, (state) => state.postsArgumentsModified);
  const setPostsArgumentsModified = useStore(store, (state) => state.setPostsArgumentsModified);

  const teamPostsQuery = useQuery({
    queryKey: ['users', userId as string, "posts", "pagination", page],
    queryFn: async () => {
      return await getUserPosts(parseInt(userId as string), page, { sort, search });
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
    setPostsArgumentsModified(true);
    router.push(pathname + '?' + createQueryString('page', newPage.toString()));
  }

  useEffect(() => {
    if (postsArgumentsModified) {
      teamPostsQuery.refetch();
      setPostsArgumentsModified(false);
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
        <p className="font-bold text-[32px]">
          포스트를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
        </p>
      </div>
    );
  }


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
        <p className="font-bold text-[32px]">
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