import TeamScheduleGame from "./TeamScheduleGame";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { TeamStoreContext } from "@/stores/teams.stores";
import { useStore } from "zustand";
import { useQuery } from "@tanstack/react-query";
import { getGamesForTeam } from "@/api/game.api";
import { filterGamesByMonth } from "@/utils/game.utils";
import TeamScheduleGameSkeleton from "./TeamScheduleGameSkeleton";
import { pageSizeControllerStoreContext } from "../common/PageSizeController";


const TeamScheduleGamesContainer = () => {
  const { teamId } = useParams();
  const store = useContext(TeamStoreContext);
  const currentFilterValue = useStore(store, (state) => state.currentScheduleFilterValue);

  const scheduleQuery = useQuery({
    queryKey: ["team", teamId, "schedule"],
    queryFn: async () => {
      return await getGamesForTeam(teamId as string);
    }
  });

  if (scheduleQuery.isLoading || scheduleQuery.isRefetching) {
    return (
      <div className="flex items-start w-full gap-[32px] flex-wrap mt-[16px]">
        <TeamScheduleGameSkeleton />
        <TeamScheduleGameSkeleton />
        <TeamScheduleGameSkeleton />
      </div>
    )
  }

  // const filteredGames = filterGamesByMonth(scheduleQuery.data, currentFilterValue);
  if (!scheduleQuery.data) {
    return (
      <div className="flex items-center justify-center w-full gap-[32px] mt-[16px]">
        <h3 className="text-white text-[20px] font-bold">게임이 없습니다.</h3>
      </div>
    )
  }

  return (
    <div className="w-full gap-[32px] mt-[16px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
      {filterGamesByMonth(scheduleQuery.data, currentFilterValue).map(game => (
        <TeamScheduleGame key={game.game_id} game={game} />
      ))}
    </div>
  );
};

export default TeamScheduleGamesContainer;