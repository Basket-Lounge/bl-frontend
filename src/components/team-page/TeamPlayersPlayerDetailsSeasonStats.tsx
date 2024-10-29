import { PlayerSeasonStats } from "@/models/player.models"


interface ITeamPlayersPlayerDetailsSeasonStatsProps {
  stats: PlayerSeasonStats;
}

const TeamPlayersPlayerDetailsSeasonStats : React.FC<ITeamPlayersPlayerDetailsSeasonStatsProps> = ({ stats }) => {
  return (
    <div className="mt-[16px] flex p-[24px] px-[48px] bg-color3 rounded-md justify-between items-center">
      <div className="text-center">
        <p className="text-[16px]">GP</p>
        <p className="text-[24px] font-medium mt-[4px]">{stats.games_played}</p>
      </div>
      <div className="text-center">
        <p className="text-[16px]">PTS</p>
        <p className="text-[24px] font-medium mt-[4px]">{stats.points.toFixed(1) || '0.0'}</p>
      </div>
      <div className="text-center">
        <p className="text-[16px]">AST</p>
        <p className="text-[24px] font-medium mt-[4px]">{stats.assists.toFixed(1) || '0.0'}</p>
      </div>
      <div className="text-center">
        <p className="text-[16px]">REB</p>
        <p className="text-[24px] font-medium mt-[4px]">{stats.rebounds_total.toFixed(1) || '0.0'}</p>
      </div>
      <div className="text-center">
        <p className="text-[16px]">STL</p>
        <p className="text-[24px] font-medium mt-[4px]">{stats.steals.toFixed(1) || '0.0'}</p>
      </div>
      <div className="text-center">
        <p className="text-[16px]">BLK</p>
        <p className="text-[24px] font-medium mt-[4px]">{stats.blocks.toFixed(1) || '0.0'}</p>
      </div>
      <div className="text-center">
        <p className="text-[16px]">FG%</p>
        <p className="text-[24px] font-medium mt-[4px]">{(stats.field_goals_percentage * 100).toFixed(1) || '0.0'}</p>
      </div>
      <div className="text-center">
        <p className="text-[16px]">3P%</p>
        <p className="text-[24px] font-medium mt-[4px]">{(stats.three_point_field_goals_percentage * 100).toFixed(1) || '0.0'}</p>
      </div>
      <div className="text-center">
        <p className="text-[16px]">FT%</p>
        <p className="text-[24px] font-medium mt-[4px]">{(stats.free_throws_percentage * 100).toFixed(1) || '0.0'}</p>
      </div>
    </div>
  );
}

export default TeamPlayersPlayerDetailsSeasonStats;
  