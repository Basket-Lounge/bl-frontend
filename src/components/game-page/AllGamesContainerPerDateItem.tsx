import { Game, LineScore } from "@/models/game.models";
import { calculateTotalPoints, displayGameTimeForGameBox } from "@/utils/game.utils";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface IAllGamesContainerPerDateItemProps {
  game: Game;
}

const AllGamesContainerPerDateItem = ({ game }: IAllGamesContainerPerDateItemProps) => {
  const router = useRouter();

  const homeTeamLineScore = game.line_scores?.find(lineScore => lineScore.team.id == game.home_team.id);
  const homeTeamTotalPoints = calculateTotalPoints(homeTeamLineScore as LineScore);

  const visitorTeamLineScore = game.line_scores?.find(lineScore => lineScore.team.id == game.visitor_team.id);
  const visitorTeamTotalPoints = calculateTotalPoints(visitorTeamLineScore as LineScore);

  const gameDateTime = displayGameTimeForGameBox(
    game.game_date_est
  ).split(" ");
  const gameDate = gameDateTime[0];
  const gameTime = gameDateTime[1] + " " + gameDateTime[2];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/games/${game.game_id}/summary`);
  }

  return (
    <div key={game.game_id} className="bg-color3 p-[24px] rounded-lg shadow-md flex flex-col gap-[16px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-[16px] w-1/3">
          <p className="py-[2px] px-[16px] bg-color4 text-white text-[14px] font-semibold rounded-full">
            AWAY
          </p>
          <Image
            className="w-auto h-[40px]"
            src={'/logos/' + game.visitor_team.symbol.toLowerCase() + '.svg'}
            alt={game.visitor_team.symbol}
            width={40}
            height={40}
          />
          <p className="text-[20px]">{game.visitor_team.symbol}</p>
          <p className="text-[24px] font-semibold">{visitorTeamTotalPoints}</p>
        </div>
        <p className="text-[16px] font-semibold w-1/3 text-center">VS</p>
        <div className="flex flex-col items-center gap-[16px] w-1/3">
          <p className="py-[2px] px-[16px] bg-color2 text-white text-[14px] font-semibold rounded-full">
            HOME
          </p>
          <Image
            className="w-auto h-[40px]"
            src={'/logos/' + game.home_team.symbol.toLowerCase() + '.svg'}
            alt={game.home_team.symbol}
            width={40}
            height={40}
          />
          <p className="text-[20px]">{game.home_team.symbol}</p>
          <p className="text-[24px] font-semibold">{homeTeamTotalPoints}</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-[16px]">{gameDate} {gameTime}</p>
      </div>
      <button 
        className="py-[8px] bg-color1 text-white font-bold text-[16px] rounded-full"
        onClick={handleClick}
      >
        <p className="text-center font-medium">상세 페이지</p>
      </button>
    </div>
  )
}

export default AllGamesContainerPerDateItem;