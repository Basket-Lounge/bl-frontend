import { Game, IGameWithTeamStats, TeamStatistics } from "@/models/game.models"
import GameSummaryTeamStatsLine from "./GameSummaryTeamStatsLine";

interface IGameSummaryTeamStatsProps {
  game: IGameWithTeamStats;
}

export default function GameSummaryTeamStats({game}: IGameSummaryTeamStatsProps) {
  return (
    <div className="flex flex-col gap-[16px] item-stretch mt-[24px]">
      <h3 className="text-white text-[16px] lg:text-[20px] font-bold">각종 스탯</h3>
      <div
        className="p-[24px] bg-color3 rounded-md flex"
      >
        <div className="divide-y divide-white">
          <div className="pb-[16px] text-[14px] lg:text-[16px]"> 
            <p className="w-[50px] font-semibold">팀</p>
          </div>
          <div className="py-[16px]">
            <p className="w-[50px] font-semibold">{game.visitor_team.symbol}</p>
          </div>
          <div className="pt-[16px]">
            <p className="w-[50px] font-semibold">{game.home_team.symbol}</p>
          </div>
        </div>
        <div className="overflow-x-auto w-[1050px] divide-y divide-white">
          <div className="pb-[16px] w-[1050px] flex text-[14px] lg:text-[16px]">
            <p className="w-[70px] font-semibold text-right">FGM</p>
            <p className="w-[70px] font-semibold text-right">FGA</p>
            <p className="w-[70px] font-semibold text-right">FG%</p>
            <p className="w-[70px] font-semibold text-right">3FGM</p>
            <p className="w-[70px] font-semibold text-right">3FGA</p>
            <p className="w-[70px] font-semibold text-right">3FG%</p>
            <p className="w-[70px] font-semibold text-right">FTM</p>
            <p className="w-[70px] font-semibold text-right">FTA</p>
            <p className="w-[70px] font-semibold text-right">FT%</p>
            <p className="w-[70px] font-semibold text-right">AST</p>
            <p className="w-[70px] font-semibold text-right">REB</p>
            <p className="w-[70px] font-semibold text-right">BLK</p>
            <p className="w-[70px] font-semibold text-right">STL</p>
            <p className="w-[70px] font-semibold text-right">TOV</p>
            <p className="w-[70px] font-semibold text-right">BL</p>
          </div>
          <GameSummaryTeamStatsLine
            stats={game.visitor_team_statistics}
            home={false}
          />
          <GameSummaryTeamStatsLine
            stats={game.home_team_statistics}
            home={true}
          />
        </div>
      </div>
    </div>
  )
}