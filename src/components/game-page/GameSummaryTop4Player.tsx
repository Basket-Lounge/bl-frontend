import { PlayerStatistics } from "@/models/game.models";
import Image from "next/image";


const GameSummaryTop4Player = (
  { playerGameStat }: {playerGameStat: PlayerStatistics}
) => {
  return (
    <div className="flex flex-col gap-[16px] lg:gap-[24px] p-[24px] bg-color3 rounded-md">
      <div className="w-[96px] h-[96px] lg:w-[128px] lg:h-[128px] overflow-hidden bg-white rounded-full relative mx-auto">
        <Image
          className="w-[100%] h-auto absolute bottom-0"
          src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerGameStat.player.id}.png`}
          alt="player-image"
          width={1040}
          height={760}
        />
      </div> 
      <h2 className="text-white text-[16px] font-semibold text-center line-clamp-1">
        {playerGameStat.player.first_name} {playerGameStat.player.last_name}
      </h2>
      <div className="flex justify-center gap-[48px]">
        <div>
          <p className="text-white text-[14px] lg:text-[16px] font-light text-center">PTS</p>
          <p className="text-white text-[20px] lg:text-[24px] font-medium text-center">{playerGameStat.points}</p>
        </div>
        <div>
          <p className="text-white text-[14px] lg:text-[16px] font-light text-center">AST</p>
          <p className="text-white text-[20px] lg:text-[24px] font-medium text-center">{playerGameStat.assists}</p>
        </div>
        <div>
          <p className="text-white text-[14px] lg:text-[16px] font-light text-center">REB</p>
          <p className="text-white text-[20px] lg:text-[24px] font-medium text-center">{playerGameStat.rebounds_total}</p>
        </div>
      </div>
    </div>
  )
}

export default GameSummaryTop4Player;