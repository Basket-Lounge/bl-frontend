'use client'

import { getMyComments } from "@/api/user.api";
import UserCommentsContainer from "@/components/my-page/UserCommentsContainer";
import UserCommentsFilter from "@/components/my-page/UserCommentsFilter";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { MyPageStoreContext } from "../layout";
import { useStore } from "zustand";


const CommentsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const store = useContext(MyPageStoreContext);
  const commentsDeleted = useStore(store, (state) => state.commentsDeleted);
  const setCommentsDeleted = useStore(store, (state) => state.setCommentsDeleted);

  const page = parseInt(searchParams.get("page") || '1');

  const userCommentsQuery = useSuspenseQuery({
    queryKey: ['my-page', "comments", "pagination", page],
    queryFn: async () => {
      return await getMyComments(page);
    },
  });

  const handlePageChange = (newPage: number) => {
    router.push(pathname + `?page=${newPage}`);
  }

  useEffect(() => {
    if (commentsDeleted) {
      setCommentsDeleted(false);
      userCommentsQuery.refetch();
    }
  }, [commentsDeleted]);

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <UserCommentsFilter />
      <UserCommentsContainer comments={userCommentsQuery.data.results} />
      <TeamPostsPagination 
        currentPageNumber={page}
        previousCallback={
          userCommentsQuery.data.previous ? () => handlePageChange(page - 1) : undefined
        }
        nextCallback={
          userCommentsQuery.data.next ? () => handlePageChange(page + 1) : undefined
        }
      />
    </div>
  )
}

export default CommentsPage;