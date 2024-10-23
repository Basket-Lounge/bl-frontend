import { ConferenceStandings, Team, TeamFranchiseHistory } from "@/models/team.models";
import { httpClient } from "./http";
import { Game } from "@/models/game.models";


export const getAllTeams = async () => {
    const response = await httpClient.get<Team[]>(`/api/teams/`);
    return response.data as Team[];
}

export const getUserFavoriteTeams = async () => {
    const response = await httpClient.get<Team[]>(`/api/users/me/favorite-teams/`);
    return response.data as Team[];
}

export const updateUserFavoriteTeams = async (teams: Team[]) => {
    const teamIds : {id: number}[] = [];
    for (let i = 0; i < teams.length; i++) {
        teamIds.push({id: teams[i].id});
    };

    const response = await httpClient.put<typeof teamIds>(`/api/users/me/favorite-teams/`, teamIds);
    return response.data;
}

export const getTeamGeneralInfo = async (teamId: string) => {
    const response = await httpClient.get<Team>(`/api/teams/${teamId}/`);
    return response.data as Team;
}

export const getTeamFranchiseHistory = async (teamId: string) => {
    const response = await httpClient.get<TeamFranchiseHistory>(`/api/teams/${teamId}/franchise-history/`);
    return response.data as TeamFranchiseHistory;
}

export const getTeamsStandings = async () => {
    const response = await httpClient.get<ConferenceStandings>(`/api/teams/standings/`);
    return response.data as ConferenceStandings;
}

export const getLast4Games = async (teamId: string) => {
    const response = await httpClient.get<Game[]>(`/api/teams/${teamId}/last-4-games/`);
    return response.data as Game[];
}