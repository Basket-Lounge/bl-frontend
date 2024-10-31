import { PlayerStatistics } from "@/models/game.models";
import { formatPlayerGameTime } from "@/utils/game.utils";


export default function GameBoxScorePlayerStatsLine(
  {stats}: {stats: PlayerStatistics}
) {
  const className = 'w-[1330px] flex py-[16px]';
  const minutes = formatPlayerGameTime(stats.minutes);
  
  if (stats.status === 'INACTIVE') {
    return (
      <div className="w-[1330px] flex py-[16px]">
        <p className="w-[70px] text-right">미출전</p>
      </div>
    )
  }

  return (
    <div className={className}>
      <p className="w-[70px]   text-right">{minutes}</p>
      <p className="w-[70px]   text-right">{stats.field_goals_made}</p>
      <p className="w-[70px]   text-right">{stats.field_goals_attempted}</p>
      <p className="w-[70px]   text-right">{(stats.field_goals_percentage * 100).toFixed(1)}</p>
      <p className="w-[70px]   text-right">{stats.three_pointers_made}</p>
      <p className="w-[70px]   text-right">{stats.three_pointers_attempted}</p>
      <p className="w-[70px]   text-right">{(stats.three_pointers_percentage * 100).toFixed(1)}</p>
      <p className="w-[70px]   text-right">{stats.free_throws_made}</p>
      <p className="w-[70px]   text-right">{stats.free_throws_attempted}</p>
      <p className="w-[70px]   text-right">{(stats.free_throws_percentage * 100).toFixed(1)}</p>
      <p className="w-[70px]   text-right">{stats.rebounds_offensive}</p>
      <p className="w-[70px]   text-right">{stats.rebounds_defensive}</p>
      <p className="w-[70px]   text-right">{stats.rebounds_total}</p>
      <p className="w-[70px]   text-right">{stats.assists}</p>
      <p className="w-[70px]   text-right">{stats.steals}</p>
      <p className="w-[70px]   text-right">{stats.blocks}</p>
      <p className="w-[70px]   text-right">{stats.turnovers}</p>
      <p className="w-[70px]   text-right">{stats.fouls_personal}</p>
      <p className="w-[70px]   text-right">{stats.points}</p>
      <p className="w-[70px]   text-right">{stats.plus - stats.minus}</p>
    </div>
  )
}