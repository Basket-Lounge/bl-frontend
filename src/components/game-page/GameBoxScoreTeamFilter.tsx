import { Team } from "@/models/team.models";
import GameBoxScoreTeamFilterButton from "./GameBoxScoreTeamFilterButton";
import { extractTeamEnglishName } from "@/utils/team.utils";


interface IGameBoxScoreTeamFilterProps {
  homeTeam: Team;
  awayTeam: Team;
}

const GameBoxScoreTeamFilter : React.FC<IGameBoxScoreTeamFilterProps> = ({homeTeam, awayTeam}) => {
  const homeTeamEnglishName = extractTeamEnglishName(homeTeam);
  const awayTeamEnglishName = extractTeamEnglishName(awayTeam);

  return (
    <div className="flex gap-[24px] items-center ">
      <GameBoxScoreTeamFilterButton name="전체" queryKey={null} />
      <GameBoxScoreTeamFilterButton name={homeTeamEnglishName} queryKey={homeTeam.id} />
      <GameBoxScoreTeamFilterButton name={awayTeamEnglishName} queryKey={awayTeam.id} />
    </div>
  );
}

export default GameBoxScoreTeamFilter;