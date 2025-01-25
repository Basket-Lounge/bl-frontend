'use client'

import { getPopularPosts } from "@/api/team.api";
import { useQuery } from "@tanstack/react-query";
import TeamGeneralInfoPopularPostsItem from "./TeamGeneralInfoPopularPostsItem";
import { useCallback } from "react";
import CuteErrorMessage from "../common/CuteErrorMessage";


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

  if (popularPostsQuery.isLoading) {
    return (
      <div className="bg-color3 rounded-md h-[160px] animate-pulse mt-[16px]" aria-label="loading-popular-posts" />
    );
  }

  if (popularPostsQuery.isError || popularPostsQuery.data === undefined) {
    return (
      <div 
        className="h-[200px] flex flex-col items-center justify-center gap-[16px]"
        aria-invalid="true"
        aria-errormessage="error-loading-popular-posts"
      >
        <CuteErrorMessage error="인기 게시물을 불러오는 중 오류가 발생했습니다." id="error-loading-popular-posts" />
      </div>
    );
  }

  if (popularPostsQuery.data.results.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]" aria-label="no-popular-posts">
        <CuteErrorMessage error="인기 게시물이 없습니다." />
      </div>
    );
  }

  return (
    <ul className="mt-[16px] flex flex-col items-stretch gap-[16px]" aria-label="team-popular-posts">
      {getTwoPopularPosts().map((post) => (
        <TeamGeneralInfoPopularPostsItem key={post.id} post={post} />
      ))}
    </ul>
  )
}

export default TeamGeneralInfoPopularPosts;