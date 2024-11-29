import UserAccountSettingsTeamLikesTeamButton from "./UserAccountSettingsTeamLikesTeamButton";
import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllTeams, getMyFavoriteTeams,  } from "@/api/team.api";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useStore } from "zustand";
import UserAccountSettingsTeamLikesSubmitButton from "./UserAccountSettingsTeamLikesSubmitButton";


const UserAccountSettingsTeamLikes = () => {
  const store = useContext(MyPageStoreContext);
  const likedTeams = useStore(store, (state) => state.likedTeams);
  const setAllTeams = useStore(store, (state) => state.setAllTeams);
  const setLikedTeams = useStore(store, (state) => state.setLikedTeams);
  const setPrevLikedTeams = useStore(store, (state) => state.setPrevLikedTeams);

  const teamsInfoQuery = useQuery({
    queryKey: ["my-page", "teams-info"], 
    queryFn: async () => {
      return await getAllTeams();
    }
  });

  const userFavoriteTeamsQuery = useQuery({
    queryKey: ["my-page", "user-favorite-teams"],
    queryFn: async () => {
      return await getMyFavoriteTeams();
    }
  });

  const handleTeamToFavorite = (teamSymbol : string) => {
    if (likedTeams.some((team) => (team.symbol === teamSymbol && team.favorite))) {
      const unlikedTeam = teamsInfoQuery.data!.find((team) => team.symbol === teamSymbol);
      unlikedTeam!.favorite = false;
      setLikedTeams(likedTeams.filter((likedTeam) => likedTeam.symbol !== teamSymbol));
      return;
    }
    else if (likedTeams.some((team) => team.symbol === teamSymbol)) {
      const newLikedTeams = likedTeams.map((likedTeam) => {
        return {
          ...likedTeam,
          favorite: false
        }
      }).filter((likedTeam) => likedTeam.symbol !== teamSymbol);

      const favoriteTeam = likedTeams.find((team) => team.symbol === teamSymbol);
      favoriteTeam!.favorite = true;
      setLikedTeams([favoriteTeam!, ...newLikedTeams]);
      return;
    }
    setLikedTeams([...likedTeams, teamsInfoQuery.data!.find((team) => team.symbol === teamSymbol)!]);
  }

  useEffect(() => {
    if (userFavoriteTeamsQuery.data) {
      setPrevLikedTeams(userFavoriteTeamsQuery.data);
      setLikedTeams(userFavoriteTeamsQuery.data);
    }
  }, [userFavoriteTeamsQuery.data]);

  useEffect(() => {
    if (teamsInfoQuery.data) {
      setAllTeams(teamsInfoQuery.data);
    }
  }, [teamsInfoQuery.data]);

  if (
    teamsInfoQuery.isLoading || 
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
      { likedTeams.length > 0 && (
      <div className="mt-[16px] flex flex-wrap gap-[24px] w-full">
        {likedTeams.map((team) => (
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
        {teamsInfoQuery.data!.map((team) => (
          <UserAccountSettingsTeamLikesTeamButton 
            key={team.id} 
            teamNameSet={team.teamname_set} 
            teamAbbreviation={team.symbol}
            liked={likedTeams.some((userTeam) => userTeam.id === team.id) ? true : false}
            favorite={
              likedTeams.some(
                (userTeam) => (userTeam.id === team.id && userTeam.favorite)
              ) ? true : false
            }
            clickCallback={handleTeamToFavorite}
          />
        ))}
      </div>
      <UserAccountSettingsTeamLikesSubmitButton />
    </div>
  );
}

export default UserAccountSettingsTeamLikes;