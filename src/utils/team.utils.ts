import { ConferenceStandings, ConferenceTeam, Team, TeamPostStatus } from "@/models/team.models";


export const extractTeamEnglishName = (team: Team) => {
  return team.teamname_set.find(name => name.language.name === "English")?.name || "";
}

export const extractTeamKoreanName = (team: Team) => {
  return team.teamname_set.find(name => name.language.name === "Korean")?.name || "";
}

export const extractStatusKoreanName = (status: TeamPostStatus) => {
  return status.poststatusdisplayname_set.find(name => name.language_data.name === "Korean")?.display_name || "";
}

export const extractStatusEnglishName = (status: TeamPostStatus) => {
  return status.poststatusdisplayname_set.find(name => name.language_data.name === "English")?.display_name || "";
}

export const getTeamConferenceInKorean = (standings: ConferenceStandings, teamId: number) => {
  if (standings.East.find(team => team.TeamID === teamId)) {
    return "동부 지구";
  }

  if (standings.West.find(team => team.TeamID === teamId)) {
    return "서부 지구";
  }
};

export const getThreeNearestTeamsFromStandings = (standings: ConferenceStandings, teamId: number) => {
  let conferenceName = "";
  if (standings.East.find(team => team.TeamID === teamId)) {
    conferenceName = "East"; 
  }

  if (standings.West.find(team => team.TeamID === teamId)) {
    conferenceName = "West";
  }

  const conferenceTeams = conferenceName === "East" ? standings.East : standings.West;

  const team = conferenceTeams.find(team => team.TeamID === teamId);
  if (!team) {
    throw new Error("Team not found in standings");
  }

  const teamIndex : number = conferenceTeams.indexOf(team);
  const returnData : {ranks: number[], teams: ConferenceTeam[]} = {
    ranks: [],
    teams: []
  };

  if (teamIndex === 0) {
    returnData.ranks = [1, 2, 3];
    returnData.teams = conferenceTeams.slice(0, 3);
  } else if (teamIndex === conferenceTeams.length - 1) {
    returnData.ranks = [conferenceTeams.length - 2, conferenceTeams.length - 1, conferenceTeams.length];
    returnData.teams = conferenceTeams.slice(conferenceTeams.length - 3, conferenceTeams.length);
  } else {
    returnData.ranks = [teamIndex, teamIndex + 1, teamIndex + 2];
    returnData.teams = conferenceTeams.slice(teamIndex - 1, teamIndex + 2);
  }

  return returnData;
};