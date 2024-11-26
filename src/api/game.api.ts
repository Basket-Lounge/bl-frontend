import { Game, GamePaginationResult, IGameWithTeamStats, PlayerStatistics } from "@/models/game.models";
import { httpClient } from "./http";


export const getGames = async (
  page: number,
  data: {
    teams?: string,
    dateStart?: string,
    dateEnd?: string,
  }
) => {
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());

  const { teams, dateStart, dateEnd } = data;

  if (teams) {
    searchParams.set('teams', teams);
  }

  if (dateStart) {
    searchParams.set('date-range-start', dateStart);
  }

  if (dateEnd) {
    searchParams.set('date-range-end', dateEnd);
  }

  const response = await httpClient.get<GamePaginationResult>('/api/games/?' + searchParams.toString());
  return response.data as GamePaginationResult;
}

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

export const sendGameChatMessage = async (
  gameId: string, 
  message: string, 
  subscriptionToken: string
) => {
  const response = await httpClient.post(
    `/api/games/${gameId}/chat/`, 
    { message, subscription_token: subscriptionToken }
  );
  return response.status;
}