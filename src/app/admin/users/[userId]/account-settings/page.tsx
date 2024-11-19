'use client'

import { getUser, updateUser } from "@/api/admin.api";
import { getAllTeams, getUserFavoriteTeams } from "@/api/team.api";
import AdminUsersDetailsAccountSettingsChatBlock from "@/components/admin-page/AdminUsersDetailsAccountSettingsChatBlock";
import AdminUsersDetailsAccountSettingsUserIntroduction from "@/components/admin-page/AdminUsersDetailsAccountSettingsTeamIntroduction";
import AdminUsersDetailsAccountSettingsTeamLikes from "@/components/admin-page/AdminUsersDetailsAccountSettingsTeamLikes";
import AdminUsersDetailsAccountSettingsUserProfile from "@/components/admin-page/AdminUsersDetailsAccountSettingsUserProfile";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";


const AccountSettingsPage = () => {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const userQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', 'details', userId as string],
    queryFn: async () => {
      return await getUser(userId as string);
    }
  });

  const teamsInfoQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', 'teams-info'],
    queryFn: async () => {
      return await getAllTeams();
    }
  });

  const userFavoriteTeamsQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', 'details', userId as string, 'favorite-teams'],
    queryFn: async () => {
      return await getUserFavoriteTeams(parseInt(userId as string));
    }
  });
  const [introduction, setIntroduction] = useState<string>(userQuery.data.introduction);
  const [isProfileVisible, setIsProfileVisible] = useState<boolean>(userQuery.data.is_profile_visible);
  const [isChatBlocked, setIsChatBlocked] = useState<boolean>(userQuery.data.chat_blocked);

  const handleIntroductionChange = (value: string) => {
    setIntroduction(value);
  }

  const handleProfileVisibility = () => {
    setIsProfileVisible(value => !value);
  }

  const handleChatBlock = () => {
    setIsChatBlocked(value => !value);
  }

  const userMutation = useMutation({
    mutationFn: (data: {introduction: string, is_profile_visible: boolean, chat_blocked: boolean}) => {
      return updateUser(parseInt(userId as string), data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['admin', 'users', 'details', userId as string], 
        data
      );
    }
  });

  return (
    <div className="flex flex-col gap-[32px] items-stretch">
      <AdminUsersDetailsAccountSettingsTeamLikes
        teams={teamsInfoQuery.data} 
        userTeamLikes={userFavoriteTeamsQuery.data}
      />
      <div className="lg:flex gap-[32px] items-stretch">
        <AdminUsersDetailsAccountSettingsUserIntroduction
          introduction={introduction} 
          updateIntroduction={handleIntroductionChange}
        />
        <div className="lg:w-1/2 tablet:mt-0 mt-[32px]">
          <AdminUsersDetailsAccountSettingsUserProfile
            isChecked={isProfileVisible}
            updateProfileVisibility={handleProfileVisibility}
          />
          <AdminUsersDetailsAccountSettingsChatBlock
            isChecked={isChatBlocked}
            updateChatBlock={handleChatBlock}
          />
        </div>
      </div>
      {userMutation.isPending && <p className="text-white text-[16px]">저장 중...</p>}
      {userMutation.isError && <p className="text-white text-[16px]">저장 중 오류가 발생했습니다.</p>}
      {(!userMutation.isPending && (
        introduction !== userQuery.data.introduction ||
        isProfileVisible !== userQuery.data.is_profile_visible ||
        isChatBlocked !== userQuery.data.chat_blocked
      )) && (
        <button 
          className="text-white bg-color1 py-[12px] px-[32px] rounded-full w-fit"
          onClick={() => userMutation.mutate({introduction, is_profile_visible: isProfileVisible, chat_blocked: isChatBlocked})}
        >
          저장하기
        </button>
      )}
    </div>
  );
}

export default AccountSettingsPage;