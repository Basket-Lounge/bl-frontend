import { PlayerCareerStats } from "@/models/player.models";


interface ITeamPlayersPlayerDetailsCareerStatsLineProps {
  stats: PlayerCareerStats;
}

export default function TeamPlayersPlayerDetailsCareerStatsLine(
  {stats}: ITeamPlayersPlayerDetailsCareerStatsLineProps
) {
  return (
    <div className="py-[16px] w-[1260px] flex" aria-label="season-stats">
      <p className="w-[60px] text-right" aria-label="team-abbreviation">{stats.team_data.symbol}</p>
      <p className="w-[60px] text-right" aria-label="total-games-played">{stats.games_played}</p>
      <p className="w-[60px] text-right" aria-label="average-minutes">{stats.minutes.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="average-points">{(stats.points).toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="average-assists">{stats.assists.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="average-rebounds">{stats.rebounds_total.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="field-goals-made">{stats.field_goals_made.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="field-goals-attempted">{stats.field_goals_attempted.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="field-goals-percentage">{(stats.field_goals_percentage * 100).toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="three-point-field-goals-made">{stats.three_point_field_goals_made.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="three-point-field-goals-attempted">{stats.three_point_field_goals_attempted.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="three-point-field-goals-percentage">{(stats.three_point_field_goals_percentage * 100).toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="free-throws-made">{stats.free_throws_made.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="free-throws-attempted">{stats.free_throws_attempted.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="free-throws-percentage">{(stats.free_throws_percentage * 100).toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="offensive-rebounds">{stats.rebounds_offensive.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="defensive-rebounds">{stats.rebounds_defensive.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="total-rebounds">{stats.rebounds_total.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="steals">{stats.steals.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="blocks">{stats.blocks.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="turnovers">{stats.turnovers.toFixed(1)}</p>
      <p className="w-[60px] text-right" aria-label="personal-fouls">{stats.personal_fouls.toFixed(1)}</p>
    </div>
  )
}