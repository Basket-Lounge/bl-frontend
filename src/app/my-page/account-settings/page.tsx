'use client'

import { getAllTeams, getUserFavoriteTeams } from "@/api/team.api";
import { getMyInfo } from "@/api/user.api";
import UserAccountSettingsTeamIntroduction from "@/components/my-page/UserAccountSettingsTeamIntroduction";
import UserAccountSettingsTeamLikes from "@/components/my-page/UserAccountSettingsTeamLikes";
import UserAccountSettingsTeamProfile from "@/components/my-page/UserAccountSettingsTeamProfile";
import { useSuspenseQuery } from "@tanstack/react-query";


const AccountSettingsPage = () => {
  const userInfoQuery = useSuspenseQuery({
    queryKey: ["my-page", "user-info"], 
    queryFn: async () => {
      return await getMyInfo();
    }
  });

  const teamsInfoQuery = useSuspenseQuery({
    queryKey: ["my-page", "teams-info"], 
    queryFn: async () => {
      return await getAllTeams();
    }
  });

  const userFavoriteTeamsQuery = useSuspenseQuery({
    queryKey: ["my-page", "user-favorite-teams"],
    queryFn: async () => {
      return await getUserFavoriteTeams();
    }
  });

  return (
    <div className="flex flex-col gap-[32px] items-stretch">
      <UserAccountSettingsTeamLikes teams={teamsInfoQuery.data} userTeamLikes={userFavoriteTeamsQuery.data} />
      <div className="flex gap-[32px] items-stretch">
        <UserAccountSettingsTeamIntroduction 
          introduction={userInfoQuery.data.introduction} 
        />
        <UserAccountSettingsTeamProfile 
          isChecked={userInfoQuery.data.is_profile_visible}
        />
      </div>
    </div>
  );
}

export default AccountSettingsPage;