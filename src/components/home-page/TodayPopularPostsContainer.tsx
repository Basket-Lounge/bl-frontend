import { getPopularPosts } from "@/api/team.api";
import { useQuery } from "@tanstack/react-query";
import TodayPopularPost from "./TodayPopularPost";
import TodayPopularPostSkeleton from "./TodayPopularPostSkeleton";
import { Carousel } from "@material-tailwind/react";
import { TeamPost } from "@/models/team.models";


const TodayPopularPostsContainer = () => {
  const popularPostsQuery = useQuery({
    queryKey: ["home", "popular-posts"],
    queryFn: async () => {
      return await getPopularPosts();
    }
  });

  // divide the games into lists of 3
  const dividePosts = (posts: TeamPost[]) => {
    const postLists = [];
    for (let i = 0; i < posts.length; i += 2) {
      postLists.push(posts.slice(i, i + 2));
    }

    return postLists;
  };

  if (popularPostsQuery.isLoading || popularPostsQuery.isRefetching) {
    return (
      <div>
        <h3 className="text-[20px] font-bold">현재 HOT한 게시물 🔥</h3>
        <div className="grid grid-cols-2 gap-[16px] mx-auto animate-pulse">
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
      <Carousel
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
        className="mt-[16px] w-full"
      >
        {dividePosts(popularPostsQuery.data!.results).map((postsList, index) => (
          <div key={index} className="grid grid-cols-2 gap-[16px] mx-auto">
            {postsList.map((post) => (
              <TodayPopularPost 
                key={post.id}
                post={post}
              />
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default TodayPopularPostsContainer;