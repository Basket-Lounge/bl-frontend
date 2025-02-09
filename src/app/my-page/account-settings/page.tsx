'use client'

import UserAccountSettingsChatBlock from "@/components/my-page/UserAccountSettingsChatBlock";
import UserAccountSettingsIntroduction from "@/components/my-page/UserAccountSettingsIntroduction";
import UserAccountSettingsProfile from "@/components/my-page/UserAccountSettingsProfile";
import UserAccountSettingsSubmitButton from "@/components/my-page/UserAccountSettingsSubmitButton";
import UserAccountSettingsTeamLikes from "@/components/my-page/UserAccountSettingsTeamLikes";
import UserAccountSettingsUsernameChange from "@/components/my-page/UserAccountSettingsUsernameChange";


const AccountSettingsPage = () => {
  return (
    <section className="flex flex-col gap-[32px] items-stretch" aria-label="account-settings">
      <UserAccountSettingsTeamLikes />
      <div className="lg:flex gap-[32px] items-stretch">
        <UserAccountSettingsIntroduction />
        <div className="lg:w-1/2 tablet:mt-0 mt-[32px]">
          <h3 className="text-white text-[20px] font-bold">계정 설정</h3>
          <UserAccountSettingsUsernameChange />
          <UserAccountSettingsProfile />
          <UserAccountSettingsChatBlock />
        </div>
      </div>
      <UserAccountSettingsSubmitButton />
    </section>
  );
}

export default AccountSettingsPage;