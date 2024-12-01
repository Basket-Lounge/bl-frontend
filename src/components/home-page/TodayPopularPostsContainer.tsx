import { getPopularPosts } from "@/api/team.api";
import { useQuery } from "@tanstack/react-query";
import TodayPopularPostsListController from "./TodayPopularPostsListController";
import TodayPopularPostSkeletonsContainer from "./TodayPopularPostSkeletonsContainer";
import CuteErrorMessage from "../common/CuteErrorMessage";


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
        <TodayPopularPostSkeletonsContainer />
      </div>
    );
  }

  if (popularPostsQuery.data!.results.length === 0) {
    return (
      <div>
        <h3 className="text-[20px] font-bold">현재 HOT한 게시물 🔥</h3>
        <div className="h-[200px] flex flex-col gap-[16px] items-center justify-center">
          <CuteErrorMessage error="현재 HOT한 게시물이 없습니다." />
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