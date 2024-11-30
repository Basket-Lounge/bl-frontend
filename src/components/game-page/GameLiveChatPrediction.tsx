import { Team } from "@/models/team.models";
import Image from "next/image";


interface IGameLiveChatPredictionProps {
  homeTeam: Team;
  awayTeam: Team;
}

const GameLiveChatPrediction = ({ homeTeam, awayTeam }: IGameLiveChatPredictionProps) => {
  return (
    <div className="flex flex-col gap-[16px] item-stretch">
      <h3 className="text-white text-[16px] lg:text-[20px] font-bold">예상하는 오늘의 경기의 승자는?  🧐</h3>
      <div className="flex items-center gap-[32px]">
        <div className="">
          <Image
            src={`/logos/${awayTeam.symbol}.svg`}
            alt={awayTeam.symbol}
            width={64}
            height={64}
            className="h-[48px] lg:h-[64px] w-auto"
          />
          <p className="text-white text-[14px] lg:text-[16px] mt-[8px] text-center font-medium">{awayTeam.symbol}</p>
        </div>
        <div className="grow">
          <div className="w-full h-[12px] rounded-full bg-white overflow-hidden">
            <div className="w-[50%] h-[12px] bg-color1"></div>
            <div className="w-[50%] h-[12px] bg-color2"></div> 
          </div>
        </div>
        <div className="">
          <Image
            src={`/logos/${homeTeam.symbol}.svg`}
            alt="home-team-logo"
            width={64}
            height={64}
            className="h-[48px] lg:h-[64px] w-auto"
          />
          <p className="text-white text-[14px] lg:text-[16px] mt-[8px] text-center font-medium">{homeTeam.symbol}</p>
        </div>
      </div>
    </div>
  );
}

export default GameLiveChatPrediction;