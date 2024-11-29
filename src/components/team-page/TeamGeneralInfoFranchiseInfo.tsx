import { getTeamFranchiseHistory } from "@/api/team.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";


const TeamGeneralInfoFranchiseInfo = () => {
  const { teamId } = useParams();
  const franchiseHistoryQuery = useQuery({
    queryKey: ["team", teamId, "franchise-history"],
    queryFn: async () => {
      return await getTeamFranchiseHistory(teamId as string);
    }
  });

  if (franchiseHistoryQuery.isLoading || franchiseHistoryQuery.isRefetching) {
    return (
      <div className="rounded-md bg-color3 p-[24px] animate-pulse mt-[16px] h-[160px]" />
    )
  }

  if (franchiseHistoryQuery.isError) {
    return (
      <div className="rounded-md bg-color3 p-[24px] mt-[16px] flex items-center justify-center">
        <p className="text-white text-[16px] font-semibold">데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    )
  }

  return (
    <div className="mt-[16px] p-[24px] flex flex-col gap-[24px] items-stretch rounded-md bg-color3">
      <div className="flex justify-between items-center text-[16px]">
        <p className="font-semibold">창단년도</p>
        <p>{franchiseHistoryQuery.data!.START_YEAR}년</p>
      </div>
      <div className="flex justify-between items-center text-[16px]">
        <p className="font-semibold">역대 승률</p>
        <p>{franchiseHistoryQuery.data!.WIN_PCT} ({franchiseHistoryQuery.data!.WINS}승 - {franchiseHistoryQuery.data!.LOSSES}패)</p>
      </div>
      <div className="flex justify-between items-center text-[16px]">
        <p className="font-semibold">리그 우승 횟수</p>
        <p>{franchiseHistoryQuery.data!.LEAGUE_TITLES}</p>
      </div>
    </div>
  )
}

export default TeamGeneralInfoFranchiseInfo;