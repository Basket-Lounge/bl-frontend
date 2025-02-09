import { PlayerCareerStats } from "@/models/player.models";


interface ITeamPlayersPlayerDetailsSeasonStatsProps {
  stats: PlayerCareerStats | undefined;
}

const TeamPlayersPlayerDetailsSeasonStats : React.FC<ITeamPlayersPlayerDetailsSeasonStatsProps> = ({ stats }) => {
  if (!stats) {
    return (
      <div className="mt-[16px] bg-color3 animate-pulse w-full h-[112px] rounded-md">
      </div>
    )
  }
  
  console.log(stats);

  return (
    <div className="mt-[16px] flex p-[24px] px-[24px] lg:px-[48px] rounded-md justify-center lg:justify-between items-center flex-wrap lg:flex-nowrap gap-[24px] border border-white/25">
      <div className="text-center">
        <p className="text-[14px] lg:text-[16px]">GP</p>
        <p className="text-[20px] lg:text-[24px] font-medium mt-[4px]">{stats.games_played}</p>
      </div>
      <div className="text-center">
        <p className="text-[14px] lg:text-[16px]">PTS</p>
        <p className="text-[20px] lg:text-[24px] font-medium mt-[4px]">{stats.points.toFixed(1) || '0.0'}</p>
      </div>
      <div className="text-center">
        <p className="text-[14px] lg:text-[16px]">AST</p>
        <p className="text-[20px] lg:text-[24px] font-medium mt-[4px]">{stats.assists.toFixed(1) || '0.0'}</p>
      </div>
      <div className="text-center">
        <p className="text-[14px] lg:text-[16px]">REB</p>
        <p className="text-[20px] lg:text-[24px] font-medium mt-[4px]">{stats.rebounds_total.toFixed(1) || '0.0'}</p>
      </div>
      <div className="text-center">
        <p className="text-[14px] lg:text-[16px]">STL</p>
        <p className="text-[20px] lg:text-[24px] font-medium mt-[4px]">{stats.steals.toFixed(1) || '0.0'}</p>
      </div>
      <div className="text-center">
        <p className="text-[14px] lg:text-[16px]">BLK</p>
        <p className="text-[20px] lg:text-[24px] font-medium mt-[4px]">{stats.blocks.toFixed(1) || '0.0'}</p>
      </div>
      <div className="text-center">
        <p className="text-[14px] lg:text-[16px]">FG%</p>
        <p className="text-[20px] lg:text-[24px] font-medium mt-[4px]">{(stats.field_goals_percentage * 100).toFixed(1) || '0.0'}</p>
      </div>
      <div className="text-center">
        <p className="text-[14px] lg:text-[16px]">3P%</p>
        <p className="text-[20px] lg:text-[24px] font-medium mt-[4px]">{(stats.three_point_field_goals_percentage * 100).toFixed(1) || '0.0'}</p>
      </div>
      <div className="text-center">
        <p className="text-[14px] lg:text-[16px]">FT%</p>
        <p className="text-[20px] lg:text-[24px] font-medium mt-[4px]">{(stats.free_throws_percentage * 100).toFixed(1) || '0.0'}</p>
      </div>
    </div>
  );
}

export default TeamPlayersPlayerDetailsSeasonStats;
  