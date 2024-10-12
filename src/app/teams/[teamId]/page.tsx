'use client';

import { createContext } from 'react';
import { createStore } from 'zustand';

import TeamHeader from "@/components/common/team-page/TeamHeader";
import TeamSectionOptions from "@/components/common/team-page/TeamSectionOptions";
import TeamPageSection from '@/components/common/team-page/TeamPageSection';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getTeamGeneralInfo } from '@/api/team.api';


export type TSection = "general" | "schedule" | "players" | "fan";
interface ITeamStore {
  section: TSection;
  updateSection: (section: TSection) => void;
  currentScheduleFilterValue: string;
  updateCurrentScheduleFilterValue: (value: string) => void;
  playersFilterValue: string;
  updatePlayersFilterValue: (value: string) => void;
}

const TeamStore = createStore<ITeamStore>((set) => ({
  section: "general",
  updateSection: (section) => set({ section }),
  currentScheduleFilterValue: "0",
  updateCurrentScheduleFilterValue: (value) => set({ currentScheduleFilterValue: value }),
  playersFilterValue: "A",
  updatePlayersFilterValue: (value) => set({ playersFilterValue: value }),
}));

export const TeamStoreContext = createContext(TeamStore);

export default function TeamsPage({ params }: { params: { teamId: string } }) {
  const headerQuery = useSuspenseQuery({
    queryKey: ["team", params.teamId], 
    queryFn: async () => {
      return await getTeamGeneralInfo(params.teamId);
    }
  });

  return (
    <TeamStoreContext.Provider value={TeamStore}>
      <div className="mx-[256px] my-[32px] flex flex-col items-stretch gap-[24px]">
        <TeamHeader team={headerQuery.data} />
        <TeamSectionOptions />
        <TeamPageSection />
      </div>
    </TeamStoreContext.Provider>
  );
}