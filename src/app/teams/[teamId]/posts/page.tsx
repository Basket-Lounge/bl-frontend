'use client'

import { getTeamPosts } from "@/api/team.api";
import TeamPostsContainer from "@/components/team-page/TeamPostsContainer";
import TeamPostsFilter from "@/components/team-page/TeamPostsFilter";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { useSuspenseQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation";
import { useState } from "react";


export default function TeamPosts() {
  const { teamId } = useParams();
  const [ page, setPage ] = useState(1);

  const teamPostsQuery = useSuspenseQuery({
    queryKey: ['team', teamId, "posts", page],
    queryFn: async () => {
      return await getTeamPosts(teamId as string);
    }
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