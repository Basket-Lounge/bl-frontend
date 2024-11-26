'use client'

import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useRef } from "react";
import { useStore } from "zustand";
import { AdminPageStoreContext } from "@/app/admin/layout";
import { getTeamPostCommentStatus } from "@/api/team.api";
import { getUserPostComments } from "@/api/admin.api";
import AdminUsersDetailsPostsCommentsFilter from "@/components/admin-page/AdminUsersDetailsPostsCommentsFilter";
import UserCommentsContainer from "@/components/common/UserCommentsContainer";
import AdminUsersDetailsPostsCommentsContainerItem from "@/components/admin-page/AdminUsersDetailsPostsCommentsContainerItem";


const CommentsPage = () => {
  const { userId } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get the query parameters
  const searchParams = useSearchParams();
  const page = isNaN(parseInt(searchParams.get('page') || '1')) ? 
    1 : 
    parseInt(searchParams.get('page') || '1');

  const status = searchParams.get('status') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const teams = searchParams.get('teams') || '';

  const store = useContext(AdminPageStoreContext);
  const lastModifiedCommentId = useStore(store, (state) => state.lastModifiedCommentId);
  const setLastModifiedCommentId = useStore(store, (state) => state.setLastModifiedCommentId);
  const commentArgumentsModified = useStore(store, (state) => state.commentArgumentsModified);
  const setCommentArgumentsModified = useStore(store, (state) => state.setCommentArgumentsModified);

  const userCommentsQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', userId as string, "comments", "pagination", page],
    queryFn: async () => {
      return await getUserPostComments(
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
    queryKey: ['admin', 'users', "comments", "statuses"],
    queryFn: async () => {
      return await getTeamPostCommentStatus();
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
    setCommentArgumentsModified(true);
    router.push(pathname + '?' + createQueryString('page', newPage.toString()));
  }

  useEffect(() => {
    if (userCommentsQuery.isRefetching) {
      return;
    }

    if (lastModifiedCommentId) {
      userCommentsQuery.refetch();
      setLastModifiedCommentId(null);
    }
  }, [lastModifiedCommentId]);

  useEffect(() => {
    if (commentArgumentsModified) {
      userCommentsQuery.refetch();
      setCommentArgumentsModified(false);
    }
  }, [status, search, sort, teams, page]);

  if (userCommentsQuery.isRefetching || userCommentsQuery.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <AdminUsersDetailsPostsCommentsFilter />
      <UserCommentsContainer comments={userCommentsQuery.data.results}>
        {userCommentsQuery.data.results.map((comment) => (
          <AdminUsersDetailsPostsCommentsContainerItem
            key={comment.id}
            comment={comment}
          />
        ))}
      </UserCommentsContainer>
      <TeamPostsPagination 
        currentPageNumber={page}
        previousCallback={
          userCommentsQuery.data.previous ? () => handlePageChange(page - 1) : undefined
        }
        nextCallback={
          userCommentsQuery.data.next ? () => handlePageChange(page + 1) : undefined
        }
        disabled={userCommentsQuery.isLoading || userCommentsQuery.isRefetching}
      />
    </div>
  )
}

export default CommentsPage;