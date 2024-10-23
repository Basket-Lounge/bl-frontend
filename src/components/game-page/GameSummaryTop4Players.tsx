import { PlayerStatistics } from "@/models/game.models";
import GameSummaryTop4Player from "./GameSummaryTop4Player";
import { getTop4PlayersFromGame } from "@/utils/game.utils";


const GameSummaryTop4Players = ({ playersStats }: { playersStats: PlayerStatistics[] }) => {
  const top4Players = getTop4PlayersFromGame(playersStats);

  return (
    <div className="flex flex-col gap-[16px] item-stretch">
      <h3 className="text-white text-[20px] font-bold">해당 경기 TOP 4 🔥</h3>
      <div className="flex gap-[32px]">
        {/* Top 4 Players */}
        {top4Players.map((playerStat) => (
          <GameSummaryTop4Player key={playerStat.player.id} playerGameStat={playerStat} />
        ))}
      </div>
    </div>
  )
}

export default GameSummaryTop4Players;