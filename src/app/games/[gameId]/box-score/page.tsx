'use client'

import { getGameGeneralInfo, getGamePlayersStats } from "@/api/game.api";
import GameBoxScorePlayerStats from "@/components/game-page/GameBoxScorePlayerStats";
import GameBoxScoreTeamFilter from "@/components/game-page/GameBoxScoreTeamFilter";
import { filterPlayerStatsByTeam } from "@/utils/game.utils";
import { extractTeamEnglishName } from "@/utils/team.utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";


export default function GameBoxScorePage() {
  const { gameId } = useParams();

  const gameQuery = useSuspenseQuery({
    queryKey: ["game", gameId as string],
    queryFn: async () => {
      return await getGameGeneralInfo(gameId as string);
    }
  });

  const playersStatsQuery = useSuspenseQuery({
    queryKey: ["game", gameId as string, "players-stats"],
    queryFn: async () => {
      return await getGamePlayersStats(gameId as string);
    },
    refetchInterval: 30000
  });

  const homeTeamEnglishName = extractTeamEnglishName(gameQuery.data.home_team);
  const awayTeamEnglishName = extractTeamEnglishName(gameQuery.data.visitor_team);

  const homeTeamPlayersStats = filterPlayerStatsByTeam(
    playersStatsQuery.data, 
    gameQuery.data.home_team.id
  );
  const awayTeamPlayersStats = filterPlayerStatsByTeam(
    playersStatsQuery.data, 
    gameQuery.data.visitor_team.id
  );

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <GameBoxScoreTeamFilter 
        homeTeam={gameQuery.data.home_team} 
        awayTeam={gameQuery.data.visitor_team} 
      />
      { /* For the visitor team */ }
      <GameBoxScorePlayerStats
        teamId={gameQuery.data.visitor_team.id}
        teamName={awayTeamEnglishName} 
        players={awayTeamPlayersStats}
      />
      { /* For the home team */ }
      <GameBoxScorePlayerStats
        teamId={gameQuery.data.home_team.id}
        teamName={homeTeamEnglishName} 
        players={homeTeamPlayersStats}
      />
    </div>
  );
}