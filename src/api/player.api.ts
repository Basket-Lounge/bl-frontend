import { Player } from "@/models/player.models";
import { httpClient } from "./http";


export const getPlayersFromTeam = async (teamId: string | number) => {
  console.log("teamId", teamId);
  const response = await httpClient.get<Player[]>(`/api/teams/${teamId}/players/`);
  return response.data as Player[];
}