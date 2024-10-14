import { TeamFranchiseHistory } from "@/models/team.models";


interface TeamGeneralInfoFranchiseInfoProps {
  franchiseHistory: TeamFranchiseHistory;
}

const TeamGeneralInfoFranchiseInfo : React.FC<TeamGeneralInfoFranchiseInfoProps> = ({
  franchiseHistory
}) => {
  return (
    <div className="mt-[16px] p-[24px] flex flex-col gap-[24px] items-stretch rounded-md bg-color3">
      <div className="flex justify-between items-center text-[16px]">
        <p className="font-semibold">창단년도</p>
        <p>{franchiseHistory.START_YEAR}년</p>
      </div>
      <div className="flex justify-between items-center text-[16px]">
        <p className="font-semibold">역대 승률</p>
        <p>{franchiseHistory.WIN_PCT} ({franchiseHistory.WINS}승 - {franchiseHistory.LOSSES}패)</p>
      </div>
      <div className="flex justify-between items-center text-[16px]">
        <p className="font-semibold">리그 우승 횟수</p>
        <p>{franchiseHistory.LEAGUE_TITLES}</p>
      </div>
    </div>
  )
}

export default TeamGeneralInfoFranchiseInfo;