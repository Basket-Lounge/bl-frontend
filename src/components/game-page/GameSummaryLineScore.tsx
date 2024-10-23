import { GAME_PERIODS } from "@/constants/game";
import { LineScore } from "@/models/game.models";
import { Team } from "@/models/team.models";
import { extractOnlyValidPeriods } from "@/utils/game.utils";


interface IGameSummaryLineScoreProps {
  homeTeam: Team;
  awayTeam: Team;
}

const GameSummaryLineScore = ({homeTeam, awayTeam}: IGameSummaryLineScoreProps) => {
  const homeTeamScoresPerPeriod = extractOnlyValidPeriods(homeTeam.linescore as LineScore);
  const awayTeamScoresPerPeriod = extractOnlyValidPeriods(awayTeam.linescore as LineScore);

  return (
    <div className="flex flex-col gap-[16px] item-stretch">
      <h3 className="text-white text-[20px] font-bold">라인스코어</h3>
      <div
        className="p-[24px] bg-color3 rounded-md flex"
      >
        <div className="divide-y divide-white">
          <div className="pb-[16px]"> 
            <p className="w-[50px] font-semibold">팀</p>
          </div>
          <div className="py-[16px]">
            <p className="w-[50px] font-semibold">{awayTeam.symbol}</p>
          </div>
          <div className="pt-[16px]">
            <p className="w-[50px] font-semibold">{homeTeam.symbol}</p>
          </div>
        </div>
        <div className="overflow-x-auto flex-grow divide-y divide-white">
          <div className={`pb-[16px] flex grow`}>
            { awayTeamScoresPerPeriod.map((score, index) => (
              <p key={index} className="grow font-semibold text-right">{GAME_PERIODS[index]}</p>
            ))}
          </div>
          <div className={`py-[16px] flex grow`}>
            { awayTeamScoresPerPeriod.map((score, index) => (
              <p key={index} className="grow text-right">{score}</p>
            ))}
          </div>
          <div className={`pt-[16px] flex grow`}>
            { homeTeamScoresPerPeriod.map((score, index) => (
              <p key={index} className="grow text-right">{score}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameSummaryLineScore;