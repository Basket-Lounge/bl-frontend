'use client'

import { getPopularPosts } from "@/api/team.api";
import { useQuery } from "@tanstack/react-query";
import TodayPopularPostsListController from "./TodayPopularPostsListController";
import TodayPopularPostSkeletonsContainer from "./TodayPopularPostSkeletonsContainer";
import CuteErrorMessage from "../common/CuteErrorMessage";


const TodayPopularPostsContainer = () => {
  const popularPostsQuery = useQuery({
    queryKey: ["home", "popular-posts"],
    queryFn: () => getPopularPosts()
  });

  if (popularPostsQuery.isLoading || popularPostsQuery.isRefetching) {
    return (
      <section>
        <h3 className="text-[20px] font-bold">현재 HOT한 게시물 🔥</h3>
        <TodayPopularPostSkeletonsContainer />
      </section>
    );
  }

  if (
    popularPostsQuery.isError || popularPostsQuery.isRefetchError ||
    popularPostsQuery.data === undefined
  ) {
    return (
      <section>
        <h3 className="text-[20px] font-bold">현재 HOT한 게시물 🔥</h3>
        <div className="h-[200px] flex flex-col gap-[16px] items-center justify-center">
          <CuteErrorMessage error="정보를 불러오는 중 오류가 발생했습니다." />
        </div>
      </section>
    );
  }

  if (popularPostsQuery.data!.results.length === 0) {
    return (
      <section>
        <h3 className="text-[20px] font-bold">현재 HOT한 게시물 🔥</h3>
        <div className="h-[200px] flex flex-col gap-[16px] items-center justify-center">
          <CuteErrorMessage error="현재 HOT한 게시물이 없습니다." />
        </div>
      </section>
    ); 
  }

  return (
    <section>
      <h3 className="text-[20px] font-bold">현재 HOT한 게시물 🔥</h3>
      <TodayPopularPostsListController posts={popularPostsQuery.data!.results} />
    </section>
  )
}

export default TodayPopularPostsContainer;