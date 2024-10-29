import { Player, PlayerCareerStats, PlayerGameStatistics, PlayerGameStats, PlayerSeasonStats } from "@/models/player.models";
import { httpClient } from "./http";


export const getPlayersFromTeam = async (teamId: string | number) => {
  const response = await httpClient.get<Player[]>(`/api/teams/${teamId}/players/`);
  return response.data as Player[];
}

export const getPlayerSeasonStats = async (teamId: string | number, playerId: string | number) => {
  const response = await httpClient.get<PlayerSeasonStats>(`/api/teams/${teamId}/players/${playerId}/season-stats/`);
  return response.data;
}

export const getPlayerCareerStats = async (teamId: string | number, playerId: string | number) => {
  const response = await httpClient.get<PlayerCareerStats[]>(`/api/teams/${teamId}/players/${playerId}/career-stats/`);
  return response.data;
}

export const getPlayerLast5GamesStats = async (teamId: string | number, playerId: string | number) => {
  const response = await httpClient.get<PlayerGameStatistics[]>(`/api/teams/${teamId}/players/${playerId}/last-5-games/`);
  return response.data;
}