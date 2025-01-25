import { getPlayersFromTeam } from "@/api/player.api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function TeamPlayers({params, children}: {
  params: {teamId: string},
  children: React.ReactNode
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["team", params.teamId, "players"],
    queryFn: () => {
      return getPlayersFromTeam(params.teamId);
    }
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}