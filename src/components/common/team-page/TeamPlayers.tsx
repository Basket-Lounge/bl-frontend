import { getPlayersFromTeam } from "@/api/player.api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import TeamPlayersFilter from "./TeamPlayersFilter";
import TeamPlayersContainer from "./TeamPlayersContainer";


export default function TeamPlayers() {
  const { teamId } = useParams();
  const teamPlayersQuery = useSuspenseQuery({
    queryKey: ["team", teamId, "players"],
    queryFn: async () => {
      return await getPlayersFromTeam(teamId as string);
    }
  });

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <TeamPlayersFilter />
      <TeamPlayersContainer players={teamPlayersQuery.data} />
    </div>
  )
}