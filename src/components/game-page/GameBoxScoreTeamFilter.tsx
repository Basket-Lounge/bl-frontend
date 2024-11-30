import { Team } from "@/models/team.models";
import GameBoxScoreTeamFilterButton from "./GameBoxScoreTeamFilterButton";
import { extractTeamEnglishName } from "@/utils/team.utils";
import { useContext } from "react";
import { pageSizeControllerStoreContext } from "../common/PageSizeController";
import { useStore } from "zustand";


interface IGameBoxScoreTeamFilterProps {
  homeTeam: Team;
  awayTeam: Team;
}

const GameBoxScoreTeamFilter : React.FC<IGameBoxScoreTeamFilterProps> = (
  {homeTeam, awayTeam}
) => {
  const store = useContext(pageSizeControllerStoreContext);
  const { pageWidth } = useStore(store);

  const homeTeamEnglishName = extractTeamEnglishName(homeTeam);
  const awayTeamEnglishName = extractTeamEnglishName(awayTeam);

  if (pageWidth < 768) {
    return (
      <div className="flex overflow-x-auto gap-[16px] flex-wrap">
        <GameBoxScoreTeamFilterButton name="전체" queryKey={null} />
        <GameBoxScoreTeamFilterButton name={homeTeamEnglishName} queryKey={homeTeam.id} />
        <GameBoxScoreTeamFilterButton name={awayTeamEnglishName} queryKey={awayTeam.id} />
      </div>
    );
  }

  return (
    <div className="flex gap-[24px] items-center ">
      <GameBoxScoreTeamFilterButton name="전체" queryKey={null} />
      <GameBoxScoreTeamFilterButton name={homeTeamEnglishName} queryKey={homeTeam.id} />
      <GameBoxScoreTeamFilterButton name={awayTeamEnglishName} queryKey={awayTeam.id} />
    </div>
  );
}

export default GameBoxScoreTeamFilter;