'use client'

import { getTeamFranchiseHistory } from "@/api/team.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CuteErrorMessage from "../common/CuteErrorMessage";


const TeamGeneralInfoFranchiseInfo = () => {
  const { teamId } = useParams();
  const franchiseHistoryQuery = useQuery({
    queryKey: ["team", teamId, "franchise-history"],
    queryFn: async () => {
      return await getTeamFranchiseHistory(teamId as string);
    },
    staleTime: 86400000
  });

  if (franchiseHistoryQuery.isLoading) {
    return (
      <div className="rounded-md bg-color3 p-[24px] animate-pulse mt-[16px] h-[160px]" aria-label="loading-franchise-info" />
    )
  }

  if (franchiseHistoryQuery.isError || franchiseHistoryQuery.data === undefined) {
    return (
      <div 
        className="h-[200px] flex flex-col items-center justify-center gap-[16px]"
        aria-invalid="true"
        aria-errormessage="error-loading-franchise-info"
      >
        <CuteErrorMessage error="팀 정보를 불러오는 중 오류가 발생했습니다." id="error-loading-franchise-info" />
      </div>
    )
  }

  return (
    <div 
      className="mt-[16px] p-[24px] flex flex-col gap-[24px] items-stretch rounded-md border border-white/25"
      aria-label="team-franchise-info"
    >
      <div className="flex justify-between items-center text-[16px]" aria-label="team-franchise-info-start-year">
        <p className="font-semibold">창단년도</p>
        <p>{franchiseHistoryQuery.data!.START_YEAR}년</p>
      </div>
      <div className="flex justify-between items-center text-[16px]" aria-label="team-franchise-info-win-pct">
        <p className="font-semibold">역대 승률</p>
        <p>{franchiseHistoryQuery.data!.WIN_PCT} ({franchiseHistoryQuery.data!.WINS}승 - {franchiseHistoryQuery.data!.LOSSES}패)</p>
      </div>
      <div className="flex justify-between items-center text-[16px]" aria-label="team-franchise-info-league-titles">
        <p className="font-semibold">리그 우승 횟수</p>
        <p>{franchiseHistoryQuery.data!.LEAGUE_TITLES}</p>
      </div>
    </div>
  )
}

export default TeamGeneralInfoFranchiseInfo;