import { IGameWithTeamStats } from "@/models/game.models";
import { convertUTCtoLocalTime } from "@/utils/game.utils";

interface IGameSummaryGeneralInfoProps {
  game: IGameWithTeamStats;
}

const GameSummaryGeneralInfo : React.FC<IGameSummaryGeneralInfoProps> = ({
  game
}) => {
  const localTimeDate = convertUTCtoLocalTime(game.game_date_est);

  return (
    <div className="flex flex-col gap-[16px] item-stretch">
      <h3 className="text-white text-[20px] font-bold">경기 정보</h3>
      <div className="p-[24px] flex flex-col gap-[20px] lg:gap-[24px] items-stretch rounded-md bg-color3 text-[16px]">
        <div className="flex justify-between items-center">
          <p className="font-semibold">경기 시간</p>
          <p>{localTimeDate.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold">경기장</p>
          <p>{game.arena_name}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold">방송 중계</p>
          <p>{game.natl_tv_broadcaster_abbreviation || game.home_tv_broadcaster_abbreviation}</p>
        </div>
      </div>
    </div>
  )
}

export default GameSummaryGeneralInfo;