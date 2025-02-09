import { getGamesForTeam } from "@/api/game.api";
import { getLast4Games } from "@/api/team.api";
import TeamGeneralInfoRecentGames from "@/components/team-page/TeamGeneralInfoRecentGames";
import TeamScheduleFilter from "@/components/team-page/TeamScheduleFilter";
import TeamScheduleGamesContainer from "@/components/team-page/TeamScheduleGamesContainer";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


export default async function TeamSchedule({ params }: { params: { teamId: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["team", params.teamId, "last-4-games"], 
    queryFn: () => {
      return getLast4Games(params.teamId);
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["team", params.teamId, "schedule"],
    queryFn: () => {
      return getGamesForTeam(params.teamId);
    }
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-[24px] items-stretch">
        <section aria-label="last-4-games">
          <h3 className="text-white text-[20px] font-bold">최근 4경기 결과</h3>
          <TeamGeneralInfoRecentGames />
        </section>
        <section aria-label="season-schedule">
          <h3 className="text-white text-[20px] font-bold">2024-25시즌 전체 스케쥴</h3>
          <TeamScheduleFilter />
          <TeamScheduleGamesContainer />
        </section>
      </div>
    </HydrationBoundary>
  )
}