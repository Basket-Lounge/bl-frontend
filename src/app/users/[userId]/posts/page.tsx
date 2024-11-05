'use client'

import { getUserPosts } from "@/api/user.api";
import TeamPostsContainer from "@/components/team-page/TeamPostsContainer";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import UserPostsFilter from "@/components/user-page/UserPostsFilter";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function UserPostsPage() {
  const { userId } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || '1');

  const queryClient = useQueryClient();
  const teamPostsQuery = useSuspenseQuery({
    queryKey: ['users', userId as string, "posts", "pagination", page],
    queryFn: async () => {
      return await getUserPosts(parseInt(userId as string), page);
    },
  });

  const handlePageChange = (newPage: number) => {
    router.push(pathname + `?page=${newPage}`);
  }

  useEffect(() => {
    return () => {
      console.log(`Page ${page} is unmounting`);
      queryClient.removeQueries({
        queryKey: ['users', userId as string, "posts", "pagination"],
      })
    }
  }, []);

  return (
    <div className="flex flex-col gap-[16px] items-stretch">
      <UserPostsFilter />
      <TeamPostsContainer posts={teamPostsQuery.data.results} />
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