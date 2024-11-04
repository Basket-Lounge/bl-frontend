'use client'

import { getMyPosts } from "@/api/user.api";
import UserPostsFilter from "@/components/my-page/UserPostsFilter";
import TeamPostsContainer from "@/components/team-page/TeamPostsContainer";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const PostsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || '1');

  const teamPostsQuery = useSuspenseQuery({
    queryKey: ['my-page', "posts", "pagination", page],
    queryFn: async () => {
      return await getMyPosts(page);
    },
  });

  const handlePageChange = (newPage: number) => {
    router.push(pathname + `?page=${newPage}`);
  }

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

export default PostsPage;