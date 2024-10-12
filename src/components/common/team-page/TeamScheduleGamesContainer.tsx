import { Game } from "@/models/game.models";
import TeamScheduleGame from "./TeamScheduleGame";


interface ITeamScheduleGamesContainerProps {
  games: Game[];
};

const TeamScheduleGamesContainer: React.FC<ITeamScheduleGamesContainerProps> = ({ games }) => {
  return (
    <div className="flex items-start w-full gap-[32px] flex-wrap mt-[16px]">
      {games.map(game => (
        <TeamScheduleGame key={game.game_id} game={game} />
      ))}
    </div>
  );
};

export default TeamScheduleGamesContainer;