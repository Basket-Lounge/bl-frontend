import { Game, LineScore } from "@/models/game.models";
import { calculateTotalPoints, displayGameTimeForGameBox } from "@/utils/game.utils";
import { extractTeamEnglishName } from "@/utils/team.utils";
import Image from "next/image";
import { useParams } from "next/navigation";


interface ITeamScheduleGameProps {
  game: Game;
}

const TeamScheduleGame : React.FC<ITeamScheduleGameProps> = ({
  game 
}) => {
  const { teamId } = useParams();
  const isHome = game.home_team.id == teamId as string;
  const bgColor = isHome ? "bg-color4" : "bg-color3";

  const teamLineScore = game.line_scores?.find(lineScore => lineScore.team.id == teamId as string) as LineScore;
  const teamTotalPoints = calculateTotalPoints(teamLineScore);

  const opponentLineScore = game.line_scores?.find(lineScore => lineScore.team.id != teamId as string) as LineScore;
  const opponentTotalPoints = calculateTotalPoints(opponentLineScore);

  const winStatus = teamTotalPoints > opponentTotalPoints ? "승리" : "패배";
  const winStatusBgColor = teamTotalPoints > opponentTotalPoints ? " bg-[#16A34A]" : " bg-[#DC0909]";

  const opponentTeamNameParts = extractTeamEnglishName(
    isHome ? game.visitor_team : game.home_team
  ).split(" ");

  const opponentTeamName = opponentTeamNameParts.length > 2 ?
    opponentTeamNameParts[0] + " " + opponentTeamNameParts[1] :
    opponentTeamNameParts[0];
  const opponentSymbol = isHome ? game.visitor_team.symbol : game.home_team.symbol;

  const gameDateTime = displayGameTimeForGameBox(
    game.game_date_est
  ).split(" ");
  const gameDate = gameDateTime[0];
  const gameTime = gameDateTime[1] + " " + gameDateTime[2];

  return (
    <div className={"flex flex-col gap-[24px] items-stretch p-[24px] rounded-md " + bgColor}>
      <p className={"text-center text-white w-full mx-auto text-[14px] rounded-full py-[6px] font-semibold bg-color1"}>
        {isHome ? "홈" : "원정"}
      </p>
      <div className="h-[128px]">
        <Image
          src={`/logos/${opponentSymbol.toLowerCase()}.svg`}
          alt={game.visitor_team.symbol}
          width={128}
          height={128}
          className="mx-auto w-auto h-[100%]"
        />
      </div>
      <div>
        <p className="text-center text-[20px] font-semibold"><span className="font-normal">vs</span> {opponentTeamName}</p>
        <p className="text-center text-[16px] mt-[12px]">{gameDate}</p>
        <p className="text-center text-[16px] mt-[12px]">{gameTime}</p>
      </div>
      {/* Game Status */}
      {game.game_status_id == 1 && (
      <div className={"py-[8px] bg-color1 text-white font-bold text-[16px] rounded-full"}>
        <p className="text-center font-medium">경기 예정</p>
      </div>
      )}
      {game.game_status_id == 2 && (
        <div className={"py-[8px] bg-[#fbbf24] text-black font-bold text-[16px] rounded-full"}>
          <p className="text-center font-medium">경기 중</p>
        </div>
      )}
      {game.game_status_id == 3 && (
      <div className={"py-[8px] text-white font-bold text-[16px] rounded-full" + winStatusBgColor}>
        <p className="text-center font-medium">{winStatus}</p>
      </div>
      )}
    </div>
  )
}

export default TeamScheduleGame;