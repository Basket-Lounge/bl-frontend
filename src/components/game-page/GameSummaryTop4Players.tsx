import GameSummaryTop4Player from "./GameSummaryTop4Player";
import { getTop4PlayersFromGame } from "@/utils/game.utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getGamePlayersStats } from "@/api/game.api";


const GameSummaryTop4Players = () => {
  const { gameId } = useParams();
  const playersStatsQuery = useQuery({
    queryKey: ["game", gameId as string, "players-stats"],
    queryFn: async () => {
      return await getGamePlayersStats(gameId as string);
    },
    refetchInterval: 30000
  });

  if (playersStatsQuery.isLoading) {
    return (
      <div className="flex flex-col gap-[16px] item-stretch">
        <h3 className="text-white text-[20px] font-bold">해당 경기 TOP 4 🔥</h3>
        <div className="grid grid-cols-4 gap-[32px] animate-pulse">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex flex-col gap-[16px] bg-color3 rounded-md h-[300px]" />
          ))}
        </div>
      </div>
    )
  }

  if (playersStatsQuery.isError) {
    return (
      <div className="flex flex-col gap-[16px] items-stretch">
        <p className="font-bold text-[32px]">
          (つ╥﹏╥)つ
        </p>
        <p className="font-bold text-[32px]">
          선수들의 기록을 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[16px] item-stretch">
      <h3 className="text-white text-[20px] font-bold">해당 경기 TOP 4 🔥</h3>
      <div className="flex gap-[32px]">
        {/* Top 4 Players */}
        {getTop4PlayersFromGame(playersStatsQuery.data!).map((playerStat) => (
          <GameSummaryTop4Player key={playerStat.player.id} playerGameStat={playerStat} />
        ))}
      </div>
    </div>
  )
}

export default GameSummaryTop4Players;