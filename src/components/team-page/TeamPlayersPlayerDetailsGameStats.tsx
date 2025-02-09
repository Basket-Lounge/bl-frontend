import { PlayerGameStatistics } from "@/models/player.models";
import TeamPlayersPlayerDetailsGameStatsLine from "./TeamPlayersPlayerDetailsGameStatsLine";


interface ITeamPlayersPlayerDetailsGameStatsProps {
  stats: PlayerGameStatistics[] | undefined;
}

export default function TeamPlayersPlayerDetailsGameStats(
  {stats}: ITeamPlayersPlayerDetailsGameStatsProps
) {
  if (!stats) {
    return (
      <div className="mt-[16px] bg-color3 animate-pulse w-full h-[112px] rounded-md">
      </div>
    )
  }

  return (
    <div
      className="mt-[16px] p-[24px] rounded-md flex border border-white/25"
      aria-label="team-players-player-details-game-stats"
    >
      <div className="divide-y divide-white">
        <div className="py-[16px] text-[14px] lg:text-[16px]" aria-label="game-stats-header">
          <p className="w-[150px] lg:w-[200px] font-semibold">매치업</p>
        </div>
        { stats.length > 0 && stats.map((seasonStats) => (
          // eslint-disable-next-line react/jsx-key
          <div className="py-[16px]" aria-label="game-stats-matchup">
            <p className="w-[150px] lg:w-[200px] font-semibold">{
              seasonStats.game_data.visitor_team.id === seasonStats.team.id ?
              `${seasonStats.game_data.visitor_team.symbol} @ ${seasonStats.game_data.home_team.symbol}` :
              `${seasonStats.game_data.home_team.symbol} vs ${seasonStats.game_data.visitor_team.symbol}`
            }</p>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto w-[1140px] divide-y divide-white">
        <div className="py-[16px] w-[1140px] flex text-[14px] lg:text-[16px]" aria-label="game-stats-header">
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-min">MIN</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-pts">PTS</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-ast">AST</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-reb">REB</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-fgm">FGM</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-fga">FGA</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-fg">FG%</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-3pm">3PM</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-3pa">3PA</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-3p">3P%</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-ftm">FTM</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-fta">FTA</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-ft">FT%</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-oreb">OREB</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-dreb">DREB</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-reb">REB</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-stl">STL</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-blk">BLK</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-tov">TOV</p>
          <p className="w-[60px] font-semibold text-right" aria-label="game-stats-header-pf">PF</p>
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