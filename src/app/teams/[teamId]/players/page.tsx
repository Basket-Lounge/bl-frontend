'use client'

import TeamPlayersPlayer from "@/components/team-page/TeamPlayersPlayer";
import { useTeamStore } from "@/stores/teams.stores";
import { filterPlayersByPosition } from "@/utils/player.utils";
import TeamPlayersFilter from "@/components/team-page/TeamPlayersFilter";
import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPlayersFromTeam } from "@/api/player.api";


const TeamPlayersContainer = () => {
  const {
    playersFilterValue
  } = useTeamStore();
  const { teamId } = useParams();

  const teamPlayersQuery = useSuspenseQuery({
    queryKey: ["team", teamId, "players"],
    queryFn: async () => {
      return await getPlayersFromTeam(teamId as string);
    }
  });

  const filteredPlayers = filterPlayersByPosition(teamPlayersQuery.data, playersFilterValue);

  return (
    <section className="flex flex-col items-stretch gap-[24px]" aria-label="team-players">
      <TeamPlayersFilter />
      <div className="w-full gap-[32px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
        {filteredPlayers.map(player => (
          <TeamPlayersPlayer key={player.id} player={player} />
        ))}
      </div>
    </section>
  );
}

export default TeamPlayersContainer;