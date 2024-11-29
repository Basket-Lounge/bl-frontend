'use client'

import TeamGeneralInfoRecentGames from "@/components/team-page/TeamGeneralInfoRecentGames";
import TeamScheduleFilter from "@/components/team-page/TeamScheduleFilter";
import TeamScheduleGamesContainer from "@/components/team-page/TeamScheduleGamesContainer";


export default function TeamSchedule() {
  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <div>
        <h3 className="text-white text-[20px] font-bold">최근 4경기 결과</h3>
        <TeamGeneralInfoRecentGames  />
      </div>
      <div>
        <h3 className="text-white text-[20px] font-bold">2024-25시즌 전체 스케쥴</h3>
        <TeamScheduleFilter />
        <TeamScheduleGamesContainer />
      </div>
    </div>
  )
}