'use client'

import UserGeneralInfoIntroduction from "@/components/user-page/UserGeneralInfoIntroduction";
import UserGeneralInfoTeamLikes from "@/components/user-page/UserGeneralInfoTeamLikes";


export default function UserGeneralInfoPage() {
  return (
    <section className="flex flex-col gap-[32px] items-stretch" aria-label="user-general-info">
      <UserGeneralInfoTeamLikes />
      <UserGeneralInfoIntroduction />
    </section>
  );
}