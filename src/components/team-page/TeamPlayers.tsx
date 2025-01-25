import { getPlayersFromTeam } from "@/api/player.api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import TeamPlayersFilter from "./TeamPlayersFilter";
import TeamPlayersContainer from "./TeamPlayersContainer";
import { Suspense, useContext } from "react";
import { TeamStoreContext, useTeamStore } from "@/stores/teams.stores";
import { useStore } from "zustand";
import TeamPlayersPlayerDetails from "./TeamPlayersPlayerDetails";


export default function TeamPlayers() {
  // const store = useContext(TeamStoreContext);
  // const currentPlayerId = useStore(store, (state) => state.currentPlayerId);

  const {
    currentPlayerId
  } = useTeamStore();

  const { teamId } = useParams();
  const teamPlayersQuery = useSuspenseQuery({
    queryKey: ["team", teamId, "players"],
    queryFn: async () => {
      return await getPlayersFromTeam(teamId as string);
    }
  });

  const selectedPlayer = teamPlayersQuery.data.find(player => player.id === currentPlayerId);

  return (
    <div className="flex flex-col gap-[24px] items-stretch border">
      {!selectedPlayer && <TeamPlayersFilter />}
      <Suspense fallback={<div>Loading...</div>}>
        {!selectedPlayer ? (
          <TeamPlayersContainer players={teamPlayersQuery.data} />
        ) : (
          <TeamPlayersPlayerDetails player={selectedPlayer} />
        )}
      </Suspense>
    </div>
  )
}