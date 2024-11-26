'use client'

import { getUserPosts } from "@/api/admin.api";
import { getTeamPostStatus } from "@/api/team.api";
import { AdminPageStoreContext } from "@/app/admin/layout";
import AdminUsersDetailsPostsContainer from "@/components/admin-page/AdminUsersDetailsPostsContainer";
import AdminUsersDetailsPostsFilter from "@/components/admin-page/AdminUsersDetailsPostsFilter";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import { useStore } from "zustand";


const PostsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = isNaN(parseInt(searchParams.get('page') || '1')) ? 
    1 : 
    parseInt(searchParams.get('page') || '1');

  const status = searchParams.get('status') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const teams = searchParams.get('teams') || '';

  const store = useContext(AdminPageStoreContext);
  const lastModifiedPostId = useStore(store, (state) => state.lastModifiedPostId);
  const setLastModifiedPostId = useStore(store, (state) => state.setLastModifiedPostId);
  const postsArgumentsModified = useStore(store, (state) => state.postsArgumentsModified);
  const setPostsArgumentsModified = useStore(store, (state) => state.setPostsArgumentsModified);

  const { userId } = useParams();

  const teamPostsQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', userId as string, "posts", "pagination", page],
    queryFn: async () => {
      return await getUserPosts(
        parseInt(userId as string), 
        page,
        {
            sort,
            search,
            status,
            teams
        }
      );    
    },
  });

  useSuspenseQuery({
    queryKey: ['admin', 'users', "posts", "statuses"],
    queryFn: async () => {
      return await getTeamPostStatus();
    },
  });

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    setPostsArgumentsModified(true);
    router.push(pathname + "?" + createQueryString('page', newPage.toString()));  
  }

  useEffect(() => {
    if (teamPostsQuery.isRefetching) {
      return;
    }
    if (lastModifiedPostId) {
      teamPostsQuery.refetch();
      setLastModifiedPostId(null);
    }
  }, [lastModifiedPostId]);

  useEffect(() => {
    if (postsArgumentsModified) {
      teamPostsQuery.refetch();
      setPostsArgumentsModified(false);
    }
  }, [sort, search, status, teams, page]);

  if (teamPostsQuery.isRefetching || teamPostsQuery.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-[16px] items-stretch">
      <AdminUsersDetailsPostsFilter />
      <AdminUsersDetailsPostsContainer posts={teamPostsQuery.data.results} />
      <TeamPostsPagination 
        currentPageNumber={page}
        previousCallback={
          teamPostsQuery.data.previous ? () => handlePageChange(page - 1) : undefined
        }
        nextCallback={
          teamPostsQuery.data.next ? () => handlePageChange(page + 1) : undefined
        }
      />
    </div>
  );
}

export default PostsPage;