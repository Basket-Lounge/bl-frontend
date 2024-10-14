import { getTeamConferenceInKorean, getThreeNearestTeamsFromStandings } from "@/utils/team.utils";
import { useParams } from "next/navigation";
import TeamGeneralInfoSeasonStandingTeam from "./TeamGeneralInfoSeasonStandingTeam";
import { ConferenceStandings } from "@/models/team.models";


interface ITeamGeneralInfoSeasonStandingsProps {
  conferenceStandings: ConferenceStandings;
}

const TeamGeneralInfoSeasonStandings : React.FC<ITeamGeneralInfoSeasonStandingsProps> = ({
  conferenceStandings
}) => {
  const { teamId } = useParams();
  const conferenceName = getTeamConferenceInKorean(
    conferenceStandings, 
    parseInt(teamId as string)
  );
  const threeTeamsConferenceStandings = getThreeNearestTeamsFromStandings(
    conferenceStandings, 
    parseInt(teamId as string)
  );
  
  return (
    <div className="rounded-md bg-color3 overflow-hidden">
      <div className="px-[24px] py-[24px]">
        <p className="text-[16px] font-bold">{conferenceName} 순위</p>
      </div>
      {threeTeamsConferenceStandings.teams.map((team, index) => (
        <TeamGeneralInfoSeasonStandingTeam 
          key={team.TeamID}
          rank={threeTeamsConferenceStandings.ranks[index]}
          teamId={team.TeamID}
          teamName={`${team.TeamCity} ${team.TeamName}`}
          symbol={team.TeamAbbreviation}
          wins={team.WINS}
          losses={team.LOSSES}
          currentPageTeam={parseInt(teamId as string) === team.TeamID}
        />
      ))}
    </div>
  )
}

export default TeamGeneralInfoSeasonStandings;