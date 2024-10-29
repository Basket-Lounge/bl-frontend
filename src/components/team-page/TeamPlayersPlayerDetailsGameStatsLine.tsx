import { PlayerGameStatistics, PlayerGameStats } from "@/models/player.models";
import { formatPlayerGameTime } from "@/utils/game.utils";


interface ITeamPlayersPlayerDetailsGameStatsLineProps {
  stats: PlayerGameStatistics;
}

export default function TeamPlayersPlayerDetailsCareerStatsLine(
  {stats}: ITeamPlayersPlayerDetailsGameStatsLineProps
) {
  const minutesInFormat = formatPlayerGameTime(stats.minutes);
  return (
    <div className="py-[16px] w-[1140px] flex">
      <p className="w-[60px]   text-right">{minutesInFormat}</p>
      <p className="w-[60px]   text-right">{stats.points}</p>
      <p className="w-[60px]   text-right">{stats.assists}</p>
      <p className="w-[60px]   text-right">{stats.rebounds_total}</p>
      <p className="w-[60px]   text-right">{stats.field_goals_made}</p>
      <p className="w-[60px]   text-right">{stats.field_goals_attempted}</p>
      <p className="w-[60px]   text-right">{(stats.field_goals_percentage * 100).toFixed(1)}</p>
      <p className="w-[60px]   text-right">{stats.three_pointers_made}</p>
      <p className="w-[60px]   text-right">{stats.three_pointers_attempted}</p>
      <p className="w-[60px]   text-right">{(stats.three_pointers_percentage * 100).toFixed(1)}</p>
      <p className="w-[60px]   text-right">{stats.free_throws_made}</p>
      <p className="w-[60px]   text-right">{stats.free_throws_attempted}</p>
      <p className="w-[60px]   text-right">{(stats.free_throws_percentage * 100).toFixed(1)}</p>
      <p className="w-[60px]   text-right">{stats.rebounds_offensive}</p>
      <p className="w-[60px]   text-right">{stats.rebounds_defensive}</p>
      <p className="w-[60px]   text-right">{stats.rebounds_total}</p>
      <p className="w-[60px]   text-right">{stats.steals}</p>
      <p className="w-[60px]   text-right">{stats.blocks}</p>
      <p className="w-[60px]   text-right">{stats.turnovers}</p>
      <p className="w-[60px]   text-right">{stats.fouls_personal}</p>
    </div>
  )
}