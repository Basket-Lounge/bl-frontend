import { getAllTeams } from "@/api/team.api";
import { useQuery } from "@tanstack/react-query";
import TeamButton from "./TeamButton";


const TeamContainer = () => {
  const teamsQuery = useQuery({
    queryKey: ['teams-info'],
    queryFn: async () => {
      return await getAllTeams();
    }
  });

  if (teamsQuery.isLoading || teamsQuery.isRefetching) {
    return (
      <div 
        className="w-[300px] bg-color3 rounded-md p-[24px] border-none flex flex-wrap gap-[16px]"
      >
        <div className="text-white">로딩 중</div>
      </div>
    )
  }

  if (teamsQuery.isError) {
    return (
      <div 
        className="w-[300px] bg-color3 rounded-md p-[24px] border-none flex flex-wrap gap-[16px]"
      >
        <div className="text-white">로딩 중 에러가 발생했습니다.</div>
      </div>
    )
  }

  return (
    <div 
      className="w-full lg:w-[600px] bg-color3 rounded-md p-[24px] border-none flex flex-wrap gap-[16px] z-20"
    >
      {teamsQuery.data!.map((team) => (
        <TeamButton
          key={team.id}
          teamId={team.id}
          teamNameSet={team.teamname_set}
          teamAbbreviation={team.symbol}
        />
      ))}      
    </div>
  )
}

export default TeamContainer;