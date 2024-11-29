import { getTeamConferenceInKorean, getThreeNearestTeamsFromStandings } from "@/utils/team.utils";
import { useParams } from "next/navigation";
import TeamGeneralInfoSeasonStandingTeam from "./TeamGeneralInfoSeasonStandingTeam";
import { useQuery } from "@tanstack/react-query";
import { getTeamsStandings } from "@/api/team.api";
import { useCallback } from "react";


const TeamGeneralInfoSeasonStandings = () => {
  const { teamId } = useParams();

  const standingsQuery = useQuery({
    queryKey: ["team", "season-standings"],
    queryFn: async () => {
      return await getTeamsStandings();
    }
  });

  const getThreeTeamsConferenceStandings = useCallback(() => {
    if (!standingsQuery.data) {
      return {
        teams: [],
        ranks: []
      }
    }

    return getThreeNearestTeamsFromStandings(
      standingsQuery.data!,
      parseInt(teamId as string)
    )
  }, [standingsQuery.data, teamId]);

  if (standingsQuery.isLoading || standingsQuery.isRefetching) {
    return (
      <div className="rounded-md bg-color3 overflow-hidden h-[320px] animate-pulse" />
    )
  }

  if (standingsQuery.isError) {
    return (
      <div className="rounded-md bg-color3 overflow-hidden h-[320px] flex flex-col items-center justify-center">
        <p className="text-white text-[16px] font-bold p-[24px]">데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md bg-color3 overflow-hidden">
      <div className="px-[24px] py-[24px]">
        <p className="text-[16px] font-bold">{
          getTeamConferenceInKorean(standingsQuery.data!, parseInt(teamId as string))
        } 순위</p>
      </div>
      {getThreeTeamsConferenceStandings().teams.map((team, index) => (
        <TeamGeneralInfoSeasonStandingTeam 
          key={team.TeamID}
          rank={
            getThreeTeamsConferenceStandings().ranks[index]
          }
          teamId={team.TeamID}
          teamName={`${team.TeamCity} ${team.TeamName}`}
          symbol={team.TeamAbbreviation}
          wins={team.WINS}
          losses={team.LOSSES}
          currentPageTeam={parseInt(teamId as string) === team.TeamID}
        />
      ))}
    </div>
  )
}

export default TeamGeneralInfoSeasonStandings;