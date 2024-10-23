import { Game, IGameWithTeamStats, PlayerStatistics } from "@/models/game.models";
import { httpClient } from "./http";

export const getGamesForTeam = async (teamId: string): Promise<Game[]> => {
  const response = await httpClient.get<Game[]>(`/api/teams/${teamId}/games/`);
  return response.data as Game[];
}

export const getTodayGames = async (): Promise<Game[]> => {
  const response = await httpClient.get<Game[]>(`/api/games/today/`);
  return response.data as Game[];
}

export const getGameGeneralInfo = async (gameId: string): Promise<IGameWithTeamStats> => {
  const response = await httpClient.get<IGameWithTeamStats>(`/api/games/${gameId}/`);
  return response.data as IGameWithTeamStats;
}

export const getGamePlayersStats = async (gameId: string): Promise<PlayerStatistics[]> => {
  const response = await httpClient.get<PlayerStatistics[]>(`/api/games/${gameId}/player-statistics/`);
  return response.data as PlayerStatistics[];
}