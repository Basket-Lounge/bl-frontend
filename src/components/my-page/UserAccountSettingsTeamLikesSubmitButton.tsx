import { Team } from "@/models/team.models";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserFavoriteTeams } from "@/api/team.api";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useStore } from "zustand";


const UserAccountSettingsTeamLikesSubmitButton = () => {
  const store = useContext(MyPageStoreContext);
  const likedTeams = useStore(store, (state) => state.likedTeams);
  const prevLikedTeams = useStore(store, (state) => state.prevLikedTeams);
  const setPrevLikedTeams = useStore(store, (state) => state.setPrevLikedTeams);

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (likedTeams: Team[]) => {
      return updateUserFavoriteTeams(likedTeams);
    },
    onSuccess: () => {
      setPrevLikedTeams(likedTeams);
      queryClient.invalidateQueries({queryKey: ["my-page", "user-info"],});
      queryClient.invalidateQueries({queryKey: ["my-page", "user-favorite-teams"],});
    }
  });

  const saveLikedTeams = () => {
    mutation.mutate(likedTeams);
  }

  if (JSON.stringify(prevLikedTeams) === JSON.stringify(likedTeams)) {
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

export default UserAccountSettingsTeamLikesSubmitButton;