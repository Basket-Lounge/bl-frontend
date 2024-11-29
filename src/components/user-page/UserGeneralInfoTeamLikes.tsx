import UserGeneralInfoTeamLikesItem from "./UserGeneralInfoTeamLikesItem";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getUserFavoriteTeams } from "@/api/team.api";


const UserGeneralInfoTeamLikes = () => {
  const { userId } = useParams();
  const userFavoriteTeamsQuery = useQuery({
    queryKey: ["users", userId as string, "favorite-teams"],
    queryFn: async () => {
      return await getUserFavoriteTeams(parseInt(userId as string));
    }
  });

  if (
    userFavoriteTeamsQuery.isLoading ||
    userFavoriteTeamsQuery.isRefetching
  ) {
    return (
      <div className="">
        <h3 className="text-white text-[20px] font-bold">좋아하는 팀</h3>
        <div className="mt-[16px] flex h-[400px] bg-color3 rounded-md animate-pulse">
        </div>
      </div>
    )
  }

  return (
    <div className="">
      <h3 className="text-white text-[20px] font-bold">좋아하는 팀</h3>
      { userFavoriteTeamsQuery.data!.length > 0 && (
      <div className="mt-[16px] flex flex-wrap gap-[24px] w-full">
        {userFavoriteTeamsQuery.data!.map((team) => (
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