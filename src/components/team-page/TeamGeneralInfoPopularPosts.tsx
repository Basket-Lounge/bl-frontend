import { getPopularPosts } from "@/api/team.api";
import { useQuery } from "@tanstack/react-query";
import TeamGeneralInfoPopularPostsItem from "./TeamGeneralInfoPopularPostsItem";
import { useCallback } from "react";


const TeamGeneralInfoPopularPosts = () => {
  const popularPostsQuery = useQuery({
    queryKey: ["team", "popular-posts"],
    queryFn: async () => {
      return await getPopularPosts();
    }
  });

  const getTwoPopularPosts = useCallback(() => {
    if (!popularPostsQuery.data) {
      return [];
    }

    return popularPostsQuery.data!.results.slice(0, 2);
  }, [popularPostsQuery.data]);

  if (popularPostsQuery.isLoading || popularPostsQuery.isRefetching) {
    return (
      <div className="bg-color3 rounded-md h-[160px] animate-pulse mt-[16px]" />
    );
  }

  if (popularPostsQuery.isError) {
    return (
      <div className="bg-color3 rounded-md h-[160px] flex items-center justify-center mt-[16px]">
        <p className="text-white text-[16px] font-semibold p-[24px]">데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-[16px] flex flex-col items-stretch gap-[16px]">
      {getTwoPopularPosts().map((post) => (
        <TeamGeneralInfoPopularPostsItem key={post.id} post={post} />
      ))}
    </div>
  )
}

export default TeamGeneralInfoPopularPosts;