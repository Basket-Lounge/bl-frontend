import TeamGeneralInfoSeasonBestPlayer from "@/components/team-page/TeamGeneralInfoSeasonBestPlayer";
import TeamGeneralInfoSeasonStandings from "@/components/team-page/TeamGeneralInfoSeasonStandings";
import TeamGeneralInfoRecentGames from "@/components/team-page/TeamGeneralInfoRecentGames";
import TeamGeneralInfoFranchiseInfo from "@/components/team-page/TeamGeneralInfoFranchiseInfo";
import TeamGeneralInfoPopularPosts from "@/components/team-page/TeamGeneralInfoPopularPosts";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getLast4Games, getTeamFranchiseHistory, getTeamsStandings } from "@/api/team.api";
import { getPlayersFromTeam } from "@/api/player.api";


export default async function TeamGeneralInfo(
  { params }: { params: { teamId: string } }
) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["team", params.teamId, "last-4-games"], 
    queryFn: () => {
      return getLast4Games(params.teamId);
    }
  });

  await queryClient.prefetchQuery({
    queryKey: ["team", "season-standings"],
    queryFn: getTeamsStandings
  });

  await queryClient.prefetchQuery({
    queryKey: ["team", params.teamId, "players"],
    queryFn: () => {
      return getPlayersFromTeam(params.teamId);
    }
  });

  await queryClient.prefetchQuery({
    queryKey: ["team", params.teamId, "franchise-history"],
    queryFn: () => {
      return getTeamFranchiseHistory(params.teamId);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col gap-[24px] items-stretch" aria-label="team-general-info">
        <div aria-label="team-last-4-games">
          <h3 className="text-white text-[20px] font-bold">최근 4경기 결과</h3>
          <TeamGeneralInfoRecentGames />
        </div>
        <div className="lg:flex items-start gap-[32px]">
          <div className="grow flex flex-col gap-[24px] items-stretch">
            <div className="flex flex-col gap-[16px]" aria-label="team-season-info">
              <h3 className="text-white text-[20px] font-bold">24-25시즌 정보</h3>
              <TeamGeneralInfoSeasonStandings />
              <TeamGeneralInfoSeasonBestPlayer />
            </div>
          </div>
          <div className="grow mt-[24px] lg:mt-0">
            <h3 className="text-white text-[20px] font-bold">최근 구단 관련 뉴스 / 소식 👀 </h3>
            <TeamGeneralInfoPopularPosts />
            <h3 className="text-white text-[20px] font-bold mt-[24px]">구단 정보</h3>
            <TeamGeneralInfoFranchiseInfo />
          </div>
        </div>
      </section>
    </HydrationBoundary>
  )
}