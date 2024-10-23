import { Team } from "@/models/team.models";
import UserAccountSettingsTeamLikesTeamButton from "./UserAccountSettingsTeamLikesTeamButton";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserFavoriteTeams } from "@/api/team.api";


const UserAccountSettingsTeamLikes = ({teams, userTeamLikes} : {teams: Team[], userTeamLikes: Team[]}) => {
  const [initialLikedTeams, setInitialLikedTeams] = useState<Team[]>(userTeamLikes);
  const [likedTeams, setLikedTeams] = useState<Team[]>(userTeamLikes);

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (likedTeams: Team[]) => {
      return updateUserFavoriteTeams(likedTeams);
    },
    onSuccess: () => {
      setInitialLikedTeams(likedTeams);
      queryClient.invalidateQueries({queryKey: ["my-page", "user-favorite-teams"],});
    }
  });

  const addTeamToFavorite = (teamSymbol : string) => {
    setLikedTeams([...likedTeams, teams.find((team) => team.symbol === teamSymbol)!]);
  }

  const removeTeamFromFavorite = (teamSymbol: string) => {
    setLikedTeams(likedTeams.filter((likedTeam) => likedTeam.symbol !== teamSymbol));
  }

  const saveLikedTeams = () => {
    mutation.mutate(likedTeams);
  }

  console.log(userTeamLikes);

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
            addToFavoriteCallback={addTeamToFavorite}
            removeFromFavoriteCallback={removeTeamFromFavorite}
          />
        ))}
      </div>
      )}
      <div className="p-[24px] rounded-md bg-color3 mt-[16px] flex flex-wrap gap-[24px]">
        {teams.map((team) => (
          <UserAccountSettingsTeamLikesTeamButton 
            key={team.id} 
            teamNameSet={team.teamname_set} 
            teamAbbreviation={team.symbol}
            liked={likedTeams.some((userTeam) => userTeam.id === team.id) ? true : false}
            addToFavoriteCallback={addTeamToFavorite}
            removeFromFavoriteCallback={removeTeamFromFavorite}
          />
        ))}
      </div>
      {/* If there are the same teams in the initialLikedTeams and likedTeams, the button will be disabled */}
      {(
        JSON.stringify(initialLikedTeams) !== JSON.stringify(likedTeams) && 
        !mutation.isPending
      ) && (
      <button 
        className="mt-[24px] bg-color1 text-white rounded-full px-[32px] py-[8px]"
        onClick={() => saveLikedTeams()}
      >
        저장
      </button>
      )}
      {mutation.isPending && <p className="mt-[16px] text-white text-[16px]">저장 중...</p>}
      {mutation.isError && <p className="mt-[16px] text-white text-[16px]">저장 중 오류가 발생했습니다.</p>}
    </div>
  );
}

export default UserAccountSettingsTeamLikes;