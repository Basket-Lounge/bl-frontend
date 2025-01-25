import { getPlayerCareerStats, getPlayerLast5GamesStats, getPlayerSeasonStats, getPlayersFromTeam } from "@/api/player.api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


export default async function PlayerDetailsLayout({params, children}: {
  params: {teamId: string, playerId: string},
  children: React.ReactNode
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["team", params.teamId, "players"],
    queryFn: () => {
      return getPlayersFromTeam(params.teamId);
    }
  });

  await queryClient.prefetchQuery({
    queryKey: ["player", params.playerId, "season-stats"],
    queryFn: () => {
        return getPlayerSeasonStats(params.teamId, params.playerId);
    }
  });

  await queryClient.prefetchQuery({
    queryKey: ["player", params.playerId, "last-5-games-stats"],
    queryFn: () => {
        return getPlayerLast5GamesStats(params.teamId, params.playerId);
    }
  });

  await queryClient.prefetchQuery({
    queryKey: ["player", params.playerId, "career-stats"],
    queryFn: () => {
        return getPlayerCareerStats(params.teamId, params.playerId);
    }
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}