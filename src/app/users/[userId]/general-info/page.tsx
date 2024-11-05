'use client'

import { getUserFavoriteTeams } from "@/api/team.api";
import { getUserInfo } from "@/api/user.api";
import UserGeneralInfoIntroduction from "@/components/user-page/UserGeneralInfoIntroduction";
import UserGeneralInfoTeamLikes from "@/components/user-page/UserGeneralInfoTeamLikes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function UserGeneralInfoPage() {
  const { userId } = useParams();
  const userInfoQuery = useSuspenseQuery({
    queryKey: ["users", userId as string, "user-info"], 
    queryFn: async () => {
      return await getUserInfo(parseInt(userId as string));
    }
  });

  const userFavoriteTeamsQuery = useSuspenseQuery({
    queryKey: ["users", userId as string, "favorite-teams"],
    queryFn: async () => {
      return await getUserFavoriteTeams(parseInt(userId as string));
    }
  });

  return (
    <div className="flex flex-col gap-[32px] items-stretch">
      <UserGeneralInfoTeamLikes userTeamLikes={userFavoriteTeamsQuery.data} />
      <UserGeneralInfoIntroduction introduction={userInfoQuery.data.introduction} />
    </div>
  );
}