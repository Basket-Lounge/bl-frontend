'use client'

import { getTeamPosts } from "@/api/team.api";
import TeamPostsContainer from "@/components/team-page/TeamPostsContainer";
import TeamPostsFilter from "@/components/team-page/TeamPostsFilter";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { useSuspenseQuery } from "@tanstack/react-query"
import { useParams, useSearchParams } from "next/navigation";


export default function TeamPosts() {
  const { teamId } = useParams();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || '1') || 1;

  const teamPostsQuery = useSuspenseQuery({
    queryKey: ['team', teamId, "posts", page],
    queryFn: async () => {
      return await getTeamPosts(teamId as string, page);
    },
  });

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <TeamPostsFilter />
      <TeamPostsContainer posts={teamPostsQuery.data.results} />
      <TeamPostsPagination 
        previousLink={teamPostsQuery.data.previous}
        currentPageNumber={page}
        nextLink={teamPostsQuery.data.next}
      />
    </div>
  )
}