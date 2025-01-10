import { getTodayGames } from "@/api/game.api";
import { getTop10PlayersThisSeason } from "@/api/player.api";
import HomePageHeader from "@/components/home-page/HomePageHeader";
import SeasonTopPlayersContainer from "@/components/home-page/SeasonTopPlayersContainer";
import TodayGamesContainer from "@/components/home-page/TodayGamesContainer";
import TodayPopularPostsContainer from "@/components/home-page/TodayPopularPostsContainer";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["home", "today-games"],
    queryFn: getTodayGames
  });

  await queryClient.prefetchQuery({
    queryKey: ["home", "top-10-players"],
    queryFn: getTop10PlayersThisSeason
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full flex flex-col gap-[32px] items-stretch mx-auto py-[32px]">
        <HomePageHeader />
        <TodayGamesContainer />
        <SeasonTopPlayersContainer />
        <TodayPopularPostsContainer />
      </div>
    </HydrationBoundary>
  );
}