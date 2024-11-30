import { getPopularPosts } from "@/api/team.api";
import { useQuery } from "@tanstack/react-query";
import TodayPopularPostSkeleton from "./TodayPopularPostSkeleton";
import { TeamPost } from "@/models/team.models";
import TodayPopularPostsListController from "./TodayPopularPostsListController";


const TodayPopularPostsContainer = () => {
  const popularPostsQuery = useQuery({
    queryKey: ["home", "popular-posts"],
    queryFn: async () => {
      return await getPopularPosts();
    }
  });

  if (popularPostsQuery.isLoading || popularPostsQuery.isRefetching) {
    return (
      <div>
        <h3 className="text-[20px] font-bold">현재 HOT한 게시물 🔥</h3>
        <div className="grid grid-cols-2 gap-[16px] mx-auto animate-pulse mt-[16px]">
          <TodayPopularPostSkeleton />
          <TodayPopularPostSkeleton />
        </div>
      </div>
    );
  }

  if (popularPostsQuery.data!.results.length === 0) {
    return (
      <div>
        <h3 className="text-[20px] font-bold">현재 HOT한 게시물 🔥</h3>
        <div className="h-[200px] flex flex-col gap-[16px] items-center justify-center">
          <p className="font-bold text-[32px]">
            (つ╥﹏╥)つ
          </p>
          <p className="font-bold text-[24px]">
            현재 HOT한 게시물이 없습니다.
          </p>
        </div>
      </div>
    ); 
  }

  return (
    <div>
      <h3 className="text-[20px] font-bold">현재 HOT한 게시물 🔥</h3>
      <TodayPopularPostsListController posts={popularPostsQuery.data!.results} />
    </div>
  )
}

export default TodayPopularPostsContainer;