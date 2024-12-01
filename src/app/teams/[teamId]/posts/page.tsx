'use client'

import { getTeamPosts } from "@/api/team.api";
import CuteErrorMessage from "@/components/common/CuteErrorMessage";
import TeamPostsContainer from "@/components/team-page/TeamPostsContainer";
import TeamPostsContainerSkeleton from "@/components/team-page/TeamPostsContainerSkeleton";
import TeamPostsFilter from "@/components/team-page/TeamPostsFilter";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { TeamStoreContext } from "@/stores/teams.stores";
import { useQuery } from "@tanstack/react-query"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import { useStore } from "zustand";


export default function TeamPosts() {
  const { teamId } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || '1') || 1;
  const sort = searchParams.get('sort') || '';
  const search = searchParams.get('search') || '';

  const store = useContext(TeamStoreContext);
  const postsArgumentsModified = useStore(store, (state) => state.postsArgumentsModified);
  const setPostsArgumentsModified = useStore(store, (state) => state.setPostsArgumentsModified);

  const teamPostsQuery = useQuery({
    queryKey: ['team', teamId, "posts", "pagination", page],
    queryFn: async () => {
      return await getTeamPosts(
        teamId as string, 
        page, 
        { sort, search }
      );
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
        <TeamPostsFilter />
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
    <div className="flex flex-col gap-[24px] items-stretch">
      <TeamPostsFilter />
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
  )
}