import { TeamStatistics } from "@/models/game.models";

export default function GameSummaryTeamStatsLine(
  {stats, home}: {stats: TeamStatistics, home: boolean}
) {
  const className = 'w-[1050px] flex' + (home ? ' pt-[16px]' : ' py-[16px]');
  return (
    <div className={className}>
      <p className="w-[70px]   text-right">{stats.field_goals_made}</p>
      <p className="w-[70px]   text-right">{stats.field_goals_attempted}</p>
      <p className="w-[70px]   text-right">{(stats.field_goals_percentage * 100).toFixed(1)}</p>
      <p className="w-[70px]   text-right">{stats.three_pointers_made}</p>
      <p className="w-[70px]   text-right">{stats.three_pointers_attempted}</p>
      <p className="w-[70px]   text-right">{(stats.three_pointers_percentage * 100).toFixed(1)}</p>
      <p className="w-[70px]   text-right">{stats.free_throws_made}</p>
      <p className="w-[70px]   text-right">{stats.free_throws_attempted}</p>
      <p className="w-[70px]   text-right">{(stats.free_throws_percentage * 100).toFixed(1)}</p>
      <p className="w-[70px]   text-right">{stats.assists}</p>
      <p className="w-[70px]   text-right">{stats.rebounds_total}</p>
      <p className="w-[70px]   text-right">{stats.blocks}</p>
      <p className="w-[70px]   text-right">{stats.steals}</p>
      <p className="w-[70px]   text-right">{stats.turnovers_total}</p>
      <p className="w-[70px]   text-right">{stats.biggest_lead}</p>
    </div>
  )
}