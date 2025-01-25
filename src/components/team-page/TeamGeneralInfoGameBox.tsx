import { Game, LineScore } from "@/models/game.models"
import TeamGeneralInfoGameBoxTeam from "./TeamGeneralInfoGameBoxTeam";
import { displayGameTimeForGameBox } from "@/utils/game.utils";
import RegularButton from "../common/RegularButton";
import { useRouter } from "next/navigation";


interface ITeamaGeneralInfoGameBoxProps {
  game: Game;
}

const TeamGeneralInfoGameBox : React.FC<ITeamaGeneralInfoGameBoxProps> = ({
  game
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/games/${game.game_id}/summary`);
  }

  const awayTeamLineScore = game.visitor_team.linescore as LineScore;
  const homeTeamLineScore = game.home_team.linescore as LineScore;

  const gameDateTime = displayGameTimeForGameBox(
    game.game_date_est
  ).split(" ");
  const gameDate = gameDateTime[0];
  const gameTime = gameDateTime[1] + " " + gameDateTime[2];

  return (
    <div className="flex flex-col gap-[24px] items-stretch p-[24px] bg-color3 rounded-md">
      <TeamGeneralInfoGameBoxTeam 
        team={game.visitor_team} 
        lineScore={awayTeamLineScore} 
        gameStatusId={game.game_status_id} 
      />
      <TeamGeneralInfoGameBoxTeam 
        team={game.home_team} 
        lineScore={homeTeamLineScore} 
        gameStatusId={game.game_status_id}
      />
      <div>
        {game.game_status_id == 1 && (
          <p className="text-[16px] font-medium text-center">{gameDate} {gameTime}</p>
        )}
        {game.game_status_id == 2 && (
          <p className="text-[16px] font-medium text-center">{game.game_status_text}</p>
        )}
        {game.game_status_id == 3 && (
          <p className="text-[16px] font-medium text-center">경기 종료</p>
        )}
      </div>
      <RegularButton
        onClick={handleClick}
        width="w-full"
      >
        상세보기
      </RegularButton>
    </div>
  )
}

export default TeamGeneralInfoGameBox;