'use client';

import TeamHeader from "@/components/team-page/TeamHeader";
import TeamSectionOptions from "@/components/team-page/TeamSectionOptions";
import { useSuspenseQuery } from '@tanstack/react-query';
import { getTeamGeneralInfo } from '@/api/team.api';
import { TeamStore, TeamStoreContext } from "@/stores/teams.stores";


export default function TeamsPage({ params, children }: { 
  params: { teamId: string }, 
  children: React.ReactNode }
) {
  const headerQuery = useSuspenseQuery({
    queryKey: ["team", params.teamId], 
    queryFn: async () => {
      return await getTeamGeneralInfo(params.teamId);
    }
  });

  return (
    <TeamStoreContext.Provider value={TeamStore}>
      <div className="my-[32px] flex flex-col items-stretch gap-[24px]">
        <h1 className="text-white text-[24px] lg:text-[32px] font-bold">팀 페이지</h1>
        <TeamHeader team={headerQuery.data} />
        <TeamSectionOptions />
        {children}
      </div>
    </TeamStoreContext.Provider>
  );
}