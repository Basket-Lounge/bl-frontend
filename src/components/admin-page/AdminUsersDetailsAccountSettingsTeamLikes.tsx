import { Team } from "@/models/team.models";
import { useContext } from "react";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import UserAccountSettingsTeamLikesTeamButton from "../my-page/UserAccountSettingsTeamLikesTeamButton";
import { updateUserFavoriteTeams } from "@/api/admin.api";
import { useParams } from "next/navigation";
import { UserManagementStoreContext } from "@/app/admin/users/[userId]/layout";
import { useStore } from "zustand";
import { getAllTeams } from "@/api/team.api";


const AdminUsersDetailsAccountSettingsTeamLikes = () => {
  const { userId } = useParams();

  const store = useContext(UserManagementStoreContext);

  const userTeamLikes = useStore(store, (state) => state.teamLikes);
  const setUserTeamLikes = useStore(store, (state) => state.setTeamLikes);

  const teamsQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', 'teams-info'],
    queryFn: async () => {
      return await getAllTeams();
    }
  });

  const mutation = useMutation({
    mutationFn: (likedTeams: Team[]) => {
      return updateUserFavoriteTeams(parseInt(userId as string), likedTeams);
    },
    onSuccess: (data) => {
      setUserTeamLikes(data);
    },
  });

  const addTeamToFavorite = (teamSymbol : string) => {
    setUserTeamLikes([...userTeamLikes, teamsQuery.data.find((team) => team.symbol === teamSymbol)!]);
  }

  const removeTeamFromFavorite = (teamSymbol: string) => {
    setUserTeamLikes(userTeamLikes.filter((likedTeam) => likedTeam.symbol !== teamSymbol));
  }

  const saveLikedTeams = () => {
    mutation.mutate(userTeamLikes);
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
            addToFavoriteCallback={addTeamToFavorite}
            removeFromFavoriteCallback={removeTeamFromFavorite}
          />
        ))}
      </div>
      )}
      <div className="p-[24px] rounded-md bg-color3 mt-[16px] flex flex-wrap gap-[24px]">
        {teamsQuery.data.map((team) => (
          <UserAccountSettingsTeamLikesTeamButton 
            key={team.id} 
            teamNameSet={team.teamname_set} 
            teamAbbreviation={team.symbol}
            liked={userTeamLikes.some((userTeam) => userTeam.id === team.id) ? true : false}
            addToFavoriteCallback={addTeamToFavorite}
            removeFromFavoriteCallback={removeTeamFromFavorite}
          />
        ))}
      </div>
      {mutation.isPending && <p className="mt-[16px] text-white text-[16px]">저장 중...</p>}
      {mutation.isError && <p className="mt-[16px] text-white text-[16px]">저장 중 오류가 발생했습니다.</p>}
      <button 
        className="mt-[24px] bg-color1 text-white rounded-full px-[32px] py-[8px]"
        onClick={() => saveLikedTeams()}
        disabled={mutation.isPending}
      >
        저장
      </button>
    </div>
  );
}

export default AdminUsersDetailsAccountSettingsTeamLikes;