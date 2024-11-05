import { Team } from "@/models/team.models";
import UserGeneralInfoTeamLikesItem from "./UserGeneralInfoTeamLikesItem";


const UserGeneralInfoTeamLikes = ({userTeamLikes} : {userTeamLikes: Team[]}) => {
  return (
    <div className="">
      <h3 className="text-white text-[20px] font-bold">좋아하는 팀</h3>
      { userTeamLikes.length > 0 && (
      <div className="mt-[16px] flex flex-wrap gap-[24px] w-full">
        {userTeamLikes.map((team) => (
          <UserGeneralInfoTeamLikesItem
            key={team.id} 
            teamNameSet={team.teamname_set} 
            teamAbbreviation={team.symbol}
          />
        ))}
      </div>
      )}
    </div>
  );
}

export default UserGeneralInfoTeamLikes;