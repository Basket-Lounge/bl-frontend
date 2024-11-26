'use client'

import AdminUsersDetailsAccountSettingsChatBlock from "@/components/admin-page/AdminUsersDetailsAccountSettingsChatBlock";
import AdminUsersDetailsAccountSettingsRoleChange from "@/components/admin-page/AdminUsersDetailsAccountSettingsRoleChange";
import AdminUsersDetailsAccountSettingsUserIntroduction from "@/components/admin-page/AdminUsersDetailsAccountSettingsTeamIntroduction";
import AdminUsersDetailsAccountSettingsTeamLikes from "@/components/admin-page/AdminUsersDetailsAccountSettingsTeamLikes";
import AdminUsersDetailsAccountSettingsUsernameChange from "@/components/admin-page/AdminUsersDetailsAccountSettingsUsernameChange";
import AdminUsersDetailsAccountSettingsUserProfile from "@/components/admin-page/AdminUsersDetailsAccountSettingsUserProfile";
import AdminUsersDetailsAccountSettingsSubmitButton from "@/components/admin-page/AdminUsersDetailsAccountSettingsSubmitButton";


const AccountSettingsPage = () => {
  return (
    <div className="flex flex-col gap-[32px] items-stretch">
      <AdminUsersDetailsAccountSettingsTeamLikes />
      <div className="lg:flex gap-[32px] items-stretch">
        <AdminUsersDetailsAccountSettingsUserIntroduction />
        <div className="lg:w-1/2 tablet:mt-0 mt-[32px]">
          <h3 className="text-white text-[20px] font-bold">계정 설정</h3>
          <AdminUsersDetailsAccountSettingsUsernameChange />
          <AdminUsersDetailsAccountSettingsRoleChange />
          <AdminUsersDetailsAccountSettingsUserProfile />
          <AdminUsersDetailsAccountSettingsChatBlock />
        </div>
      </div>
      <AdminUsersDetailsAccountSettingsSubmitButton />
    </div>
  );
}

export default AccountSettingsPage;