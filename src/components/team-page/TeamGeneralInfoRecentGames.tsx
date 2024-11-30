import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getLast4Games } from "@/api/team.api";
import TeamGeneralInfoRecentGamesCarousel from "./TeamGeneralInfoRecentGamesCarousel";


const TeamGeneralInfoRecentGames = () => {
  const { teamId } = useParams();

  const recentGamesQuery = useQuery({
    queryKey: ["team", teamId, "last-4-games"], 
    queryFn: async () => {
      return await getLast4Games(teamId as string);
    }
  });

  if (recentGamesQuery.isLoading || recentGamesQuery.isRefetching) {
    return (
      <div className="mt-[16px] flex gap-[32px]">
        <div className="bg-color3 animate-pulse w-full h-[250px] rounded-md">
        </div>
        <div className="bg-color3 animate-pulse w-full h-[250px] rounded-md">
        </div>
        <div className="bg-color3 animate-pulse w-full h-[250px] rounded-md">
        </div>
        <div className="bg-color3 animate-pulse w-full h-[250px] rounded-md">
        </div>
      </div>
    )
  }

  if (!recentGamesQuery.data) {
    return (
      <div className="mt-[16px] flex gap-[32px]">
        <h3 className="text-white text-[20px] font-bold">게임이 없습니다.</h3>
      </div>
    )
  }

  return (
    <div className="mt-[16px] flex gap-[32px]">
      <TeamGeneralInfoRecentGamesCarousel games={recentGamesQuery.data} />
    </div>
  )
}

export default TeamGeneralInfoRecentGames;