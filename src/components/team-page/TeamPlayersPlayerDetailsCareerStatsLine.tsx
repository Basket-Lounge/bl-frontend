import { PlayerCareerStats } from "@/models/player.models";


interface ITeamPlayersPlayerDetailsCareerStatsLineProps {
  stats: PlayerCareerStats;
}

export default function TeamPlayersPlayerDetailsCareerStatsLine(
  {stats}: ITeamPlayersPlayerDetailsCareerStatsLineProps
) {
  return (
    <div className="py-[16px] w-[1260px] flex">
      <p className="w-[60px]   text-right">{stats.team_data.symbol}</p>
      <p className="w-[60px]   text-right">{stats.games_played}</p>
      <p className="w-[60px]   text-right">{stats.minutes}</p>
      <p className="w-[60px]   text-right">{stats.points}</p>
      <p className="w-[60px]   text-right">{stats.assists}</p>
      <p className="w-[60px]   text-right">{stats.rebounds_total}</p>
      <p className="w-[60px]   text-right">{stats.field_goals_made}</p>
      <p className="w-[60px]   text-right">{stats.field_goals_attempted}</p>
      <p className="w-[60px]   text-right">{(stats.field_goals_percentage * 100).toFixed(1)}</p>
      <p className="w-[60px]   text-right">{stats.three_point_field_goals_made}</p>
      <p className="w-[60px]   text-right">{stats.three_point_field_goals_attempted}</p>
      <p className="w-[60px]   text-right">{(stats.three_point_field_goals_percentage * 100).toFixed(1)}</p>
      <p className="w-[60px]   text-right">{stats.free_throws_made}</p>
      <p className="w-[60px]   text-right">{stats.free_throws_attempted}</p>
      <p className="w-[60px]   text-right">{(stats.free_throws_percentage * 100).toFixed(1)}</p>
      <p className="w-[60px]   text-right">{stats.rebounds_offensive}</p>
      <p className="w-[60px]   text-right">{stats.rebounds_defensive}</p>
      <p className="w-[60px]   text-right">{stats.rebounds_total}</p>
      <p className="w-[60px]   text-right">{stats.steals}</p>
      <p className="w-[60px]   text-right">{stats.blocks}</p>
      <p className="w-[60px]   text-right">{stats.turnovers}</p>
      <p className="w-[60px]   text-right">{stats.personal_fouls}</p>
    </div>
  )
}