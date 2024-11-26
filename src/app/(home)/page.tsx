'use client'

import SeasonTopPlayersContainer from "@/components/home-page/SeasonTopPlayersContainer";
import TodayGamesContainer from "@/components/home-page/TodayGamesContainer";
import TodayPopularPostsContainer from "@/components/home-page/TodayPopularPostsContainer";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-[32px] items-stretch mx-auto py-[32px]">
      {/* Greeting Section */}
      <div className="h-[300px] bg-white w-full relative flex flex-col justify-center items-start overflow-hidden">
        {/* <video 
          loop muted autoPlay 
          className="absolute z-10 left-0 top-0 w-[75%] h-auto"
        >
          <source src="/videos/intro.mp4" type="video/mp4" />
        </video> */}
        <div className="h-[96px] w-fit flex flex-col justify-between px-[128px] z-20 text-white">
          <h2 className="text-[24px] font-light">NBA 마니아를 위한 공간</h2>
          <h1 className="text-[32px] font-bold">Basket Lounge</h1>
        </div>
      </div>
      {/* Today's Game Section */}
      <TodayGamesContainer />
      {/* Top 10 Players Section */}
      <SeasonTopPlayersContainer />
      {/* Today's Popular Posts Section */}
      <TodayPopularPostsContainer />
    </div>
  );
}