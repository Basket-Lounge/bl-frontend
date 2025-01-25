import { getTeamGeneralInfo } from "@/api/team.api";
import TeamHeader from "@/components/team-page/TeamHeader";
import TeamSectionOptions from "@/components/team-page/TeamSectionOptions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


export default async function TeamsPage({ params, children }: { 
  params: { teamId: string }, 
  children: React.ReactNode }
) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["team", params.teamId],
    queryFn: ({ queryKey }) => {
      return getTeamGeneralInfo(queryKey[1]);
    }
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="my-[32px] flex flex-col items-stretch gap-[24px]">
        <h1 className="text-white text-[24px] lg:text-[32px] font-bold">팀 페이지</h1>
        <TeamHeader />
        <TeamSectionOptions />
        {children}
      </div>
    </HydrationBoundary>
  );
}