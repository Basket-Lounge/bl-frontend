'use client'

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getLast4Games } from "@/api/team.api";
import TeamGeneralInfoRecentGamesCarousel from "./TeamGeneralInfoRecentGamesCarousel";
import TeamGeneralInfoRecentGamesSkeletons from "./TeamGeneralInfoRecentGamesSkeletons";
import CuteErrorMessage from "../common/CuteErrorMessage";


const TeamGeneralInfoRecentGames = () => {
  const { teamId } = useParams();

  const recentGamesQuery = useQuery({
    queryKey: ["team", teamId, "last-4-games"], 
    queryFn: async () => {
      return await getLast4Games(teamId as string);
    },
  });

  if (recentGamesQuery.isLoading) {
    return (
      <TeamGeneralInfoRecentGamesSkeletons />
    )
  }

  if (recentGamesQuery.isError || recentGamesQuery.data === undefined) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage error="최근 게임 정보를 불러오는 중 오류가 발생했습니다." />
      </div>
    )
  }

  if (recentGamesQuery.data.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage error="최근 게임 정보가 없습니다." />
      </div>
    )
  }

  return (
    <div className="mt-[16px] flex gap-[32px]">
      <TeamGeneralInfoRecentGamesCarousel games={recentGamesQuery.data} />
    </div>
  )
}

export default TeamGeneralInfoRecentGames;