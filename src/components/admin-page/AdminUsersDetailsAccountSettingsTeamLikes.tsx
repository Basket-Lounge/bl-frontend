import { useContext, useEffect } from "react";
import UserAccountSettingsTeamLikesTeamButton from "../my-page/UserAccountSettingsTeamLikesTeamButton";
import { UserManagementStoreContext } from '@/stores/admin.stores';
import { useStore } from "zustand";
import { getAllTeams, getUserFavoriteTeams } from "@/api/team.api";
import AdminUsersDetailsAccountSettingsTeamLikesSubmitButton from "./AdminUsersDetailsAccountSettingsTeamLikesSubmitButton";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";


const AdminUsersDetailsAccountSettingsTeamLikes = () => {
  const { userId } = useParams();
  const store = useContext(UserManagementStoreContext);

  const userTeamLikes = useStore(store, (state) => state.teamLikes);
  const setUserTeamLikes = useStore(store, (state) => state.setTeamLikes);
  const setPrevUserTeamLikes = useStore(store, (state) => state.setPrevTeamLikes);
  const setAllTeams = useStore(store, (state) => state.setAllTeams);

  const teamsQuery = useQuery({
    queryKey: ['admin', 'users', 'teams-info'],
    queryFn: async () => {
      return await getAllTeams();
    }
  });

  const userFavoriteTeamsQuery = useQuery({
    queryKey: ['admin', 'users', 'details', userId as string, 'favorite-teams'],
    queryFn: async () => {
      return await getUserFavoriteTeams(parseInt(userId as string));
    }
  });

  const handleTeamToFavorite = (teamSymbol : string) => {
    if (userTeamLikes.some((team) => (team.symbol === teamSymbol && team.favorite))) {
      const unlikedTeam = teamsQuery.data!.find((team) => team.symbol === teamSymbol);
      unlikedTeam!.favorite = false;
      setUserTeamLikes(userTeamLikes.filter((likedTeam) => likedTeam.symbol !== teamSymbol));
      return;
    }
    else if (userTeamLikes.some((team) => team.symbol === teamSymbol)) {
      const newLikedTeams = userTeamLikes.map((likedTeam) => {
        return {
          ...likedTeam,
          favorite: false
        }
      }).filter((likedTeam) => likedTeam.symbol !== teamSymbol);

      const favoriteTeam = userTeamLikes.find((team) => team.symbol === teamSymbol);
      favoriteTeam!.favorite = true;
      setUserTeamLikes([favoriteTeam!, ...newLikedTeams]);
      return;
    }
    setUserTeamLikes([...userTeamLikes, teamsQuery.data!.find((team) => team.symbol === teamSymbol)!]);
  }

  useEffect(() => {
    if (userFavoriteTeamsQuery.data) {
      setPrevUserTeamLikes(userFavoriteTeamsQuery.data);
      setUserTeamLikes(userFavoriteTeamsQuery.data);
    }
  }, [userFavoriteTeamsQuery.data]);

  useEffect(() => {
    if (teamsQuery.data) {
      setAllTeams(teamsQuery.data);
    }
  }, [teamsQuery.data]);

  if (
    teamsQuery.isLoading || 
    userFavoriteTeamsQuery.isLoading
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
      { userTeamLikes.length > 0 && (
      <div className="mt-[16px] flex flex-wrap gap-[24px] w-full">
        {userTeamLikes.map((team) => (
          <UserAccountSettingsTeamLikesTeamButton
            key={team.id} 
            teamNameSet={team.teamname_set} 
            teamAbbreviation={team.symbol}
            liked={true}
            favorite={team.favorite}
            clickCallback={handleTeamToFavorite}
          />
        ))}
      </div>
      )}
      <div className="p-[24px] rounded-md bg-color3 mt-[16px] flex flex-wrap gap-[24px]">
        {teamsQuery.data!.map((team) => (
          <UserAccountSettingsTeamLikesTeamButton 
            key={team.id} 
            teamNameSet={team.teamname_set} 
            teamAbbreviation={team.symbol}
            liked={userTeamLikes.some((userTeam) => userTeam.id === team.id) ? true : false}
            favorite={
              userTeamLikes.some(
                (userTeam) => (userTeam.id === team.id && userTeam.favorite)
              ) ? true : false
            }
            clickCallback={handleTeamToFavorite}
          />
        ))}
      </div>
      <AdminUsersDetailsAccountSettingsTeamLikesSubmitButton />
    </div>
  );
}

export default AdminUsersDetailsAccountSettingsTeamLikes;