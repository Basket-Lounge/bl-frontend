import { useQuery } from "@tanstack/react-query";
import { getTodayGames } from "@/api/game.api";
import { filterTodayGames } from "@/utils/game.utils";
import TodayGamesListController from "./TodayGamesListController";
import TodayGameSkeletonsContainer from "./TodayGameSkeletonsContainer";
import CuteErrorMessage from "../common/CuteErrorMessage";


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
        <TodayGameSkeletonsContainer />
      </div>
    );
  }

  if (todayGamesQuery.data!.length === 0) {
    return (
      <div>
        <h3 className="text-[20px] font-bold">오늘의 경기</h3>
        <div className="h-[200px] flex flex-col gap-[16px] items-center justify-center">
          <CuteErrorMessage error="오늘의 경기가 없습니다." />
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