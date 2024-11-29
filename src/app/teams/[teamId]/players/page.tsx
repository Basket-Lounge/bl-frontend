'use client'

import TeamPlayersPlayer from "@/components/team-page/TeamPlayersPlayer";
import { useContext } from "react";
import { TeamStoreContext } from "@/stores/teams.stores";
import { useStore } from "zustand";
import { filterPlayersByPosition } from "@/utils/player.utils";
import TeamPlayersFilter from "@/components/team-page/TeamPlayersFilter";
import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPlayersFromTeam } from "@/api/player.api";


const TeamPlayersContainer = () => {
  const store = useContext(TeamStoreContext);
  const playersFilterValue = useStore(store, (state) => state.playersFilterValue);
  const { teamId } = useParams();

  const teamPlayersQuery = useSuspenseQuery({
    queryKey: ["team", teamId, "players"],
    queryFn: async () => {
      return await getPlayersFromTeam(teamId as string);
    }
  });

  const filteredPlayers = filterPlayersByPosition(teamPlayersQuery.data, playersFilterValue);

  return (
    <div className="flex flex-col items-stretch gap-[24px]">
      <TeamPlayersFilter />
      <div className="flex items-start w-full gap-[32px] flex-wrap">
        {filteredPlayers.map(player => (
          <TeamPlayersPlayer key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}

export default TeamPlayersContainer;