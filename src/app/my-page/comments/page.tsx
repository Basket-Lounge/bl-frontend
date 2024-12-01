'use client'

import { getMyComments } from "@/api/user.api";
import CuteErrorMessage from "@/components/common/CuteErrorMessage";
import ErrorHandler from "@/components/common/error/ErrorHandler";
import UserCommentsContainer from "@/components/my-page/UserCommentsContainer";
import UserCommentsContainerSkeleton from "@/components/my-page/UserCommentsContainerSkeleton";
import UserCommentsFilter from "@/components/my-page/UserCommentsFilter";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import { useStore } from "zustand";


const CommentsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const store = useContext(MyPageStoreContext);
  const commentArgumentsModified = useStore(store, (state) => state.commentArgumentsModified);
  const setCommentArgumentsModified = useStore(store, (state) => state.setCommentArgumentsModified);
  const commentsDeleted = useStore(store, (state) => state.commentsDeleted);
  const setCommentsDeleted = useStore(store, (state) => state.setCommentsDeleted);

  const page = parseInt(searchParams.get("page") || '1');
  const sort = searchParams.get('sort') || '';
  const search = searchParams.get('search') || '';

  const userCommentsQuery = useQuery({
    queryKey: ['my-page', "comments", "pagination", page],
    queryFn: async () => {
      return await getMyComments(page, { sort, search });
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
    if (commentsDeleted) {
      setCommentsDeleted(false);
      userCommentsQuery.refetch();
    }
  }, [commentsDeleted]);

  useEffect(() => {
    if (commentArgumentsModified) {
      setCommentArgumentsModified(false);
      userCommentsQuery.refetch();
    }
  }, [page, sort, search]);

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
        error="댓글을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요."
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

export default CommentsPage;