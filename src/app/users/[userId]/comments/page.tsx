'use client'

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getUserComments } from "@/api/user.api";
import UserCommentsFilter from "@/components/user-page/UserCommentsFilter";
import UserCommentsContainer from "@/components/my-page/UserCommentsContainer";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { useEffect } from "react";


export default function UserCommentsPage() {
  const { userId } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || '1');

  const queryClient = useQueryClient();
  const userCommentsQuery = useSuspenseQuery({
    queryKey: ['users', userId as string, "comments", "pagination", page],
    queryFn: async () => {
      return await getUserComments(parseInt(userId as string), page);
    },
  });

  const handlePageChange = (newPage: number) => {
    router.push(pathname + `?page=${newPage}`);
  }

  useEffect(() => {
    return () => {
      console.log(`Page ${page} is unmounting`);
      queryClient.removeQueries({
        queryKey: ['users', userId as string, "comments", "pagination"],
      })
    }
  }, []);

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