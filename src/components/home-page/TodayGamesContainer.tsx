import { Game } from "@/models/game.models";
import TodayGame from "./TodayGame";
import { Carousel } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { getTodayGames } from "@/api/game.api";
import { filterTodayGames } from "@/utils/game.utils";
import TodayGameSkeleton from "./TodayGameSkeleton";


export default function TodayGamesContainer() {
  const todayGamesQuery = useQuery({
    queryKey: ["home", "today-games"],
    queryFn: async () => {
      const games = await getTodayGames();
      return filterTodayGames(games);
    }
  });

  // divide the games into lists of 3
  const divideGames = (games: Game[]) => {
    const gamesLists = [];
    for (let i = 0; i < games.length; i += 3) {
      gamesLists.push(games.slice(i, i + 3));
    }

    return gamesLists;
  };

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
      <Carousel 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
        className="mt-[16px] w-full z-10"
      >
        {divideGames(todayGamesQuery.data!).map((gamesList, index) => (
          <div key={index} className="grid grid-cols-3 gap-[16px] mx-auto">
            {gamesList.map((game) => (
              <TodayGame 
                key={game.game_id} 
                game={game}
              />
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}