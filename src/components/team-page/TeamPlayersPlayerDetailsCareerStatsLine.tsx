import { PlayerSeasonStats } from "@/models/player.models";


interface ITeamPlayersPlayerDetailsCareerStatsLineProps {
  stats: PlayerSeasonStats;
}

export default function TeamPlayersPlayerDetailsCareerStatsLine(
  {stats}: ITeamPlayersPlayerDetailsCareerStatsLineProps
) {
  return (
    <div className="py-[16px] w-[1260px] flex">
      <p className="w-[60px]   text-right">{stats.TEAM_ABBREVIATION}</p>
      <p className="w-[60px]   text-right">{stats.GP}</p>
      <p className="w-[60px]   text-right">{stats.MIN}</p>
      <p className="w-[60px]   text-right">{stats.PTS}</p>
      <p className="w-[60px]   text-right">{stats.AST}</p>
      <p className="w-[60px]   text-right">{stats.REB}</p>
      <p className="w-[60px]   text-right">{stats.FGM}</p>
      <p className="w-[60px]   text-right">{stats.FGA}</p>
      <p className="w-[60px]   text-right">{(stats.FG_PCT * 100).toFixed(1)}</p>
      <p className="w-[60px]   text-right">{stats.FG3M}</p>
      <p className="w-[60px]   text-right">{stats.FG3A}</p>
      <p className="w-[60px]   text-right">{(stats.FG3_PCT * 100).toFixed(1)}</p>
      <p className="w-[60px]   text-right">{stats.FTM}</p>
      <p className="w-[60px]   text-right">{stats.FTA}</p>
      <p className="w-[60px]   text-right">{(stats.FT_PCT * 100).toFixed(1)}</p>
      <p className="w-[60px]   text-right">{stats.OREB}</p>
      <p className="w-[60px]   text-right">{stats.DREB}</p>
      <p className="w-[60px]   text-right">{stats.REB}</p>
      <p className="w-[60px]   text-right">{stats.STL}</p>
      <p className="w-[60px]   text-right">{stats.BLK}</p>
      <p className="w-[60px]   text-right">{stats.TOV}</p>
      <p className="w-[60px]   text-right">{stats.PF}</p>
    </div>
  )
}