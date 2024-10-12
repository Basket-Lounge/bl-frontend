import { Game } from "@/models/game.models";
import { httpClient } from "./http";

export const getGamesForTeam = async (teamId: string): Promise<Game[]> => {
  const response = await httpClient.get<Game[]>(`/api/teams/${teamId}/games/`);
  return response.data as Game[];
}