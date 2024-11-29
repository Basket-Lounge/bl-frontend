import { Team } from "@/models/team.models";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserFavoriteTeams } from "@/api/team.api";
import { useStore } from "zustand";
import { UserManagementStoreContext } from "@/stores/admin.stores";
import { useParams } from "next/navigation";


const AdminUsersDetailsAccountSettingsTeamLikesSubmitButton = () => {
  const { userId } = useParams();
  const store = useContext(UserManagementStoreContext);

  const userTeamLikes = useStore(store, (state) => state.teamLikes);
  const prevUserTeamLikes = useStore(store, (state) => state.prevTeamLikes);
  const setPrevUserTeamLikes = useStore(store, (state) => state.setPrevTeamLikes);

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (likedTeams: Team[]) => {
      return updateUserFavoriteTeams(likedTeams);
    },
    onSuccess: () => {
      setPrevUserTeamLikes(userTeamLikes);
      queryClient.invalidateQueries(
        {queryKey: ['admin', 'users', 'details', userId as string, 'favorite-teams'],}
      );
      queryClient.invalidateQueries({queryKey: ['admin', 'users', 'details', userId as string],});
    }
  });

  const saveLikedTeams = () => {
    mutation.mutate(userTeamLikes);
  }

  if (JSON.stringify(prevUserTeamLikes) === JSON.stringify(userTeamLikes)) {
    return null;
  }

  return (
    <div className="mt-[24px]">
      {mutation.isError && <p className="text-white text-[16px]">저장 중 오류가 발생했습니다.</p>}
      <button 
        className="mt-[16px] bg-color1 text-white rounded-full px-[32px] py-[8px]"
        onClick={() => saveLikedTeams()}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "저장 중..." : "저장"}
      </button>
    </div>
  );
}

export default AdminUsersDetailsAccountSettingsTeamLikesSubmitButton;