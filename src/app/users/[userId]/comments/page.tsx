'use client'

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserComments } from "@/api/user.api";
import UserCommentsFilter from "@/components/user-page/UserCommentsFilter";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { useCallback, useContext, useEffect } from "react";
import { UserStoreContext } from "@/stores/users.stores";
import { useStore } from "zustand";
import UserCommentsContainerSkeleton from "@/components/my-page/UserCommentsContainerSkeleton";
import UserCommentsContainer from "@/components/user-page/UserCommentsContainer";
import CuteErrorMessage from "@/components/common/CuteErrorMessage";


export default function UserCommentsPage() {
  const { userId } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || '1');
  const sort = searchParams.get('sort') || '';
  const search = searchParams.get('search') || '';

  const store = useContext(UserStoreContext);
  const commentsArgumentsModified = useStore(store, (state) => state.commentsArgumentsModified);
  const setcommentsArgumentsModified = useStore(store, (state) => state.setCommentsArgumentsModified);

  const userCommentsQuery = useQuery({
    queryKey: ['users', userId as string, "comments", "pagination", page],
    queryFn: async () => {
      return await getUserComments(
        parseInt(userId as string), 
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
    setcommentsArgumentsModified(true);
    router.push(pathname + '?' + createQueryString('page', newPage.toString()));
  }

  useEffect(() => {
    if (commentsArgumentsModified) {
      userCommentsQuery.refetch();
      setcommentsArgumentsModified(false);
    }
  }, [search, sort, page]);

  if (userCommentsQuery.isLoading || userCommentsQuery.isRefetching) {
    return (
      <div className="flex flex-col gap-[16px] items-stretch">
        <UserCommentsFilter />
        <UserCommentsContainerSkeleton />
      </div>
    );
  }

  if (userCommentsQuery.isError) {
    return (
      <CuteErrorMessage
        error="댓글을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요"
      />
    );
  }

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <UserCommentsFilter />
      <UserCommentsContainer comments={userCommentsQuery.data!.results} />
      <TeamPostsPagination 
        currentPageNumber={page}
        previousCallback={
          userCommentsQuery.data!.previous ? () => handlePageChange(page - 1) : undefined
        }
        nextCallback={
          userCommentsQuery.data!.next ? () => handlePageChange(page + 1) : undefined
        }
      />
    </div>
  )
}