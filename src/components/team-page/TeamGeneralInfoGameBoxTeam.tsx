import { LineScore } from "@/models/game.models";
import { Team } from "@/models/team.models"
import { calculateTotalPoints } from "@/utils/game.utils";
import { extractTeamKoreanName } from "@/utils/team.utils";
import Image from "next/image"


interface ITeamaGeneralInfoGameBoxProps {
  team: Team;
  lineScore: LineScore | null;
  gameStatusId: number;
}

const TeamGeneralInfoGameBoxTeam : React.FC<ITeamaGeneralInfoGameBoxProps> = ({
  team,
  lineScore,
  gameStatusId
}) => {
  return (
    <div className="flex items-center justify-between">
      {/* 사진 */}
      <div className="flex items-center gap-[16px]">
        <div className="w-[48px] bg-transparent rounded-full relative">
          <Image
            className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
            src={'/logos/' + team.symbol.toLowerCase() + '.svg'}
            alt="team-logo"
            width={20}
            height={20}
          />
        </div>
        <div>
          <p className="text-white text-[20px] font-medium">{team.symbol}</p>
          <p className="text-white text-[16px] font-light mt-[8px]">{
            extractTeamKoreanName(team).split(' ')[0]
          }</p>
        </div>
      </div>
      {/* 점수 */}
      <p className="text-white text-[24px] font-medium">{
        (!lineScore || gameStatusId === 1) ? '-' : calculateTotalPoints(lineScore)
      }</p>
    </div>
  )
}

export default TeamGeneralInfoGameBoxTeam;