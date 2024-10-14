import { PlayerSeasonStats } from "@/models/player.models";
import TeamPlayersPlayerDetailsCareerStatsLine from "./TeamPlayersPlayerDetailsCareerStatsLine";


interface ITeamPlayersPlayerDetailsCareerStatsProps {
  stats: PlayerSeasonStats[];
}

export default function TeamPlayersPlayerDetailsCareerStats({stats}: ITeamPlayersPlayerDetailsCareerStatsProps) {
  return (
    <div
      className="mt-[16px] p-[24px] bg-color3 rounded-md flex"
    >
      <div className="divide-y divide-white">
        <div className="py-[16px]"> 
          <p className="w-[200px] font-semibold">Season</p>
        </div>
        { stats.length > 0 && stats.map((seasonStats, index) => (
          <div className="py-[16px]">
            <p className="w-[200px] font-semibold">{seasonStats.SEASON_ID}</p>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto w-[1260px] divide-y divide-white">
        <div className="py-[16px] w-[1260px] flex">
          <p className="w-[60px] font-semibold text-right">TEAM</p>
          <p className="w-[60px] font-semibold text-right">GP</p>
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
        {stats.map((seasonStats, index) => (
          <TeamPlayersPlayerDetailsCareerStatsLine
            key={index}
            stats={seasonStats}
          />
        ))}
      </div>
    </div>
  )
}