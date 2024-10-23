import { IGameWithTeamStats, LineScore } from "@/models/game.models";
import { calculateTotalPoints } from "@/utils/game.utils";
import { extractTeamEnglishName, extractTeamKoreanName } from "@/utils/team.utils";
import Image from "next/image";


export default function GameHeader({ game }: { game: IGameWithTeamStats }) {
  const homeTeamScore = calculateTotalPoints(game.home_team.linescore as LineScore);
  const visitorTeamScore = calculateTotalPoints(game.visitor_team.linescore as LineScore);
  
  const homeTeamEnglishName = extractTeamEnglishName(game.home_team);
  const homeTeamKoreanName = extractTeamKoreanName(game.home_team);

  const visitorTeamEnglishName = extractTeamEnglishName(game.visitor_team);
  const visitorTeamKoreanName = extractTeamKoreanName(game.visitor_team);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h4 className="text-white text-[20px] font-medium text-left">원정팀</h4>
        <h4 className="text-white text-[20px] font-medium text-right">홈팀</h4>
      </div>
      {/* Team Logos and Scores */}
      <div className="flex justify-between items-center mt-[16px]">
        <div className="flex justify-between items-center gap-[48px]">
          <div className="flex items-center w-[200px]">
            <Image
              src={`/logos/${game.visitor_team.symbol.toLowerCase()}.svg`}
              alt="visitor-team-logo"
              width={128}
              height={24}
              className="w-auto h-[128px]"
            />
          </div>
          <h1 className="text-white text-[48px] font-medium w-1/2 text-center">{visitorTeamScore}</h1>
        </div>
        <h4 className="text-white text-[16px] font-medium rounded-full py-[12px] px-[16px] border border-white">{game.game_status_text}</h4>
        <div className="flex justify-between items-center gap-[48px]">
          <h1 className="text-white text-[48px] font-medium w-1/2 text-center">{homeTeamScore}</h1>
          <div className="flex items-center w-[200px] justify-end">
            <Image
              src={`/logos/${game.home_team.symbol.toLowerCase()}.svg`}
              alt="home-team-logo"
              width={128}
              height={24}
              className="w-auto h-[128px]"
            />
          </div>
        </div>
      </div>
      {/* Team Names */}
      <div className="flex justify-between items-center mt-[20px]">
        <div className="flex flex-col items-start gap-[12px]">
          <p className="text-[20px] font-bold">{visitorTeamEnglishName}</p>
          <p className="text-[16px] font-medium">{visitorTeamKoreanName}</p>
        </div>
        <div className="flex flex-col items-end gap-[12px]">
          <p className="text-[20px] font-bold">{homeTeamEnglishName}</p>
          <p className="text-[16px] font-medium">{homeTeamKoreanName}</p>
        </div>
      </div>
    </div>
  )
}