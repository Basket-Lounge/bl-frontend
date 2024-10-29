import { PlayerGameStatistics } from "@/models/player.models";
import TeamPlayersPlayerDetailsGameStatsLine from "./TeamPlayersPlayerDetailsGameStatsLine";


interface ITeamPlayersPlayerDetailsGameStatsProps {
  stats: PlayerGameStatistics[];
}

export default function TeamPlayersPlayerDetailsGameStats({stats}: ITeamPlayersPlayerDetailsGameStatsProps) {
  return (
    <div
      className="mt-[16px] p-[24px] bg-color3 rounded-md flex"
    >
      <div className="divide-y divide-white">
        <div className="py-[16px]"> 
          <p className="w-[200px] font-semibold">매치업</p>
        </div>
        { stats.length > 0 && stats.map((seasonStats, index) => (
          <div className="py-[16px]">
            <p className="w-[200px] font-semibold">{
              seasonStats.game_data.visitor_team.id === seasonStats.team.id ?
              `${seasonStats.game_data.visitor_team.symbol} @ ${seasonStats.game_data.home_team.symbol}` :
              `${seasonStats.game_data.home_team.symbol} vs ${seasonStats.game_data.visitor_team.symbol}`
            }</p>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto w-[1140px] divide-y divide-white">
        <div className="py-[16px] w-[1140px] flex">
          <p className="w-[60px] font-semibold text-right">MIN</p>
          <p className="w-[60px] font-semibold text-right">PTS</p>
          <p className="w-[60px] font-semibold text-right">AST</p>
          <p className="w-[60px] font-semibold text-right">REB</p>
          <p className="w-[60px] font-semibold text-right">FGM</p>
          <p className="w-[60px] font-semibold text-right">FGA</p>
          <p className="w-[60px] font-semibold text-right">FG%</p>
          <p className="w-[60px] font-semibold text-right">3PM</p>
          <p className="w-[60px] font-semibold text-right">3PA</p>
          <p className="w-[60px] font-semibold text-right">3P%</p>
          <p className="w-[60px] font-semibold text-right">FTM</p>
          <p className="w-[60px] font-semibold text-right">FTA</p>
          <p className="w-[60px] font-semibold text-right">FT%</p>
          <p className="w-[60px] font-semibold text-right">OREB</p>
          <p className="w-[60px] font-semibold text-right">DREB</p>
          <p className="w-[60px] font-semibold text-right">REB</p>
          <p className="w-[60px] font-semibold text-right">STL</p>
          <p className="w-[60px] font-semibold text-right">BLK</p>
          <p className="w-[60px] font-semibold text-right">TOV</p>
          <p className="w-[60px] font-semibold text-right">PF</p>
        </div>
        {stats.map((gameStats, index) => (
          <TeamPlayersPlayerDetailsGameStatsLine
            key={index}
            stats={gameStats}
          />
        ))}
      </div>
    </div>
  )
}