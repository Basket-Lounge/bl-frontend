import { useRouter } from "next/navigation";
import TeamGeneralInfoGameBoxTeam from "../team-page/TeamGeneralInfoGameBoxTeam";
import { Game, LineScore } from "@/models/game.models";


interface ITodayGameProps {
  game: Game;
}

export default function TodayGame({ game }: ITodayGameProps) {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/games/${game.game_id}`);
  }

  return (
    <div className="p-[24px] bg-color3 rounded-md w-1/3 flex flex-col gap-[16px]">
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
      <p className="text-[16px] font-medium text-center">경기 종료</p>
      <button 
        onClick={handleClick}
        className="bg-color1 rounded-full justify-center py-[12px] w-full font-medium"
      >
        상세보기
      </button>
    </div>
  )
}
