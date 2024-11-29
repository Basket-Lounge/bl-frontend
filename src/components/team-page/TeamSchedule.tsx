import { useSuspenseQuery } from "@tanstack/react-query";
import TeamGeneralInfoRecentGames from "./TeamGeneralInfoRecentGames";
import { useParams } from "next/navigation";
import { getLast4Games } from "@/api/team.api";
import TeamScheduleFilter from "./TeamScheduleFilter";
import { useContext } from "react";
import { TeamStoreContext } from "@/stores/teams.stores";
import { useStore } from "zustand";
import { getGamesForTeam } from "@/api/game.api";
import TeamScheduleGamesContainer from "./TeamScheduleGamesContainer";
import { filterGamesByMonth } from "@/utils/game.utils";

export default function TeamSchedule() {
  const { teamId } = useParams();
  const store = useContext(TeamStoreContext);
  const currentFilterValue = useStore(store, (state) => state.currentScheduleFilterValue);

  const recentGamesQuery = useSuspenseQuery({
    queryKey: ["team", teamId, "last-4-games"], 
    queryFn: async () => {
      return await getLast4Games(teamId as string);
    }
  });

  const scheduleQuery = useSuspenseQuery({
    queryKey: ["team", teamId, "schedule"],
    queryFn: async () => {
      return await getGamesForTeam(teamId as string);
    }
  });

  const filteredGames = filterGamesByMonth(scheduleQuery.data, currentFilterValue);

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <div>
        <h3 className="text-white text-[20px] font-bold">최근 4경기 결과</h3>
        <TeamGeneralInfoRecentGames games={recentGamesQuery.data} />
      </div>
      <div>
        <h3 className="text-white text-[20px] font-bold">2024-25시즌 전체 스케쥴</h3>
        <TeamScheduleFilter />
        <TeamScheduleGamesContainer games={filteredGames} />
      </div>
    </div>
  )
}