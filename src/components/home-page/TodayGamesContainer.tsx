import { useQuery } from "@tanstack/react-query";
import { getTodayGames } from "@/api/game.api";
import { filterTodayGames } from "@/utils/game.utils";
import TodayGameSkeleton from "./TodayGameSkeleton";
import TodayGamesListController from "./TodayGamesListController";


export default function TodayGamesContainer() {
  const todayGamesQuery = useQuery({
    queryKey: ["home", "today-games"],
    queryFn: async () => {
      const games = await getTodayGames();
      return filterTodayGames(games);
    }
  });

  if (todayGamesQuery.isLoading || todayGamesQuery.isRefetching) {
    return (
      <div>
        <h3 className="text-[20px] font-bold">오늘의 경기</h3>
        <div className="w-full gap-[16px] items-stretch grid grid-cols-3 animate-pulse mt-[16px]">
          <TodayGameSkeleton />
          <TodayGameSkeleton />
          <TodayGameSkeleton />
        </div>
      </div>
    );
  }

  if (todayGamesQuery.data!.length === 0) {
    return (
      <div>
        <h3 className="text-[20px] font-bold">오늘의 경기</h3>
        <div className="h-[200px] flex flex-col gap-[16px] items-center justify-center">
          <p className="font-bold text-[32px]">
            (つ╥﹏╥)つ
          </p>
          <p className="font-bold text-[24px]">
            오늘은 경기가 없습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-[20px] font-bold">오늘의 경기</h3>
      <TodayGamesListController games={todayGamesQuery.data!} />
    </div>
  );
}