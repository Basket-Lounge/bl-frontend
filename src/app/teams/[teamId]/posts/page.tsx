'use client'

import { getTeamPosts } from "@/api/team.api";
import TeamPostsContainer from "@/components/team-page/TeamPostsContainer";
import TeamPostsFilter from "@/components/team-page/TeamPostsFilter";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { useSuspenseQuery } from "@tanstack/react-query"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";


export default function TeamPosts() {
  const { teamId } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || '1') || 1;

  const teamPostsQuery = useSuspenseQuery({
    queryKey: ['team', teamId, "posts", "pagination", page],
    queryFn: async () => {
      return await getTeamPosts(teamId as string, page);
    },
  });

  const handlePageChange = (newPage: number) => {
    router.push(pathname + `?page=${newPage}`);
  }

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <TeamPostsFilter />
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
  )
}