import { useRouter } from "next/navigation";
import TeamGeneralInfoGameBoxTeam from "../team-page/TeamGeneralInfoGameBoxTeam";
import { Game, LineScore } from "@/models/game.models";
import { displayGameTimeForGameBox } from "@/utils/game.utils";


interface ITodayGameProps {
  game: Game;
}

export default function TodayGame({ game }: ITodayGameProps) {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/games/${game.game_id}/summary`);
  }

  const gameDateTime = displayGameTimeForGameBox(
    game.game_date_est
  ).split(" ");
  const gameDate = gameDateTime[0];
  const gameTime = gameDateTime[1] + " " + gameDateTime[2];

  const gameInProgressEffect = game.game_status_id != 2 ? "bg-color3" : "animate-fadeFrom3To2";
  return (
    <div className={"p-[24px] rounded-md flex flex-col gap-[16px] relative " + gameInProgressEffect}>
      <TeamGeneralInfoGameBoxTeam 
        team={game.visitor_team} 
        lineScore={game.visitor_team.linescore as LineScore} 
        gameStatusId={game.game_status_id} 
      />
      <TeamGeneralInfoGameBoxTeam 
        team={game.home_team} 
        lineScore={game.home_team.linescore as LineScore} 
        gameStatusId={game.game_status_id}
      />
      {game.game_status_id == 1 && (
        <p className="text=lg:text-[16px] font-medium text-center">{gameDate} {gameTime}</p>
      )}
      {game.game_status_id == 2 && (
        <p className="text-[16px] font-medium text-center">{game.game_status_text}</p>
      )}
      {game.game_status_id == 3 && (
        <p className="text-[16px] font-medium text-center">경기 종료</p>
      )}
      <button 
        onClick={handleClick}
        className="bg-color1 rounded-full justify-center py-[12px] w-full font-medium"
      >
        상세보기
      </button>
    </div>
  )
}
