'use client'

import TeamGeneralInfoSeasonBestPlayer from "@/components/team-page/TeamGeneralInfoSeasonBestPlayer";
import TeamGeneralInfoSeasonStandings from "@/components/team-page/TeamGeneralInfoSeasonStandings";
import TeamGeneralInfoRecentGames from "@/components/team-page/TeamGeneralInfoRecentGames";
import TeamGeneralInfoFranchiseInfo from "@/components/team-page/TeamGeneralInfoFranchiseInfo";
import TeamGeneralInfoPopularPosts from "@/components/team-page/TeamGeneralInfoPopularPosts";


export default function TeamGeneralInfo() {
  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <div>
        <h3 className="text-white text-[20px] font-bold">최근 4경기 결과</h3>
        <TeamGeneralInfoRecentGames />
      </div>
      <div className="lg:flex items-start gap-[32px]">
        <div className="grow flex flex-col gap-[24px] items-stretch">
          <div className="flex flex-col gap-[16px]">
            <h3 className="text-white text-[20px] font-bold">24-25시즌 정보</h3>
            <TeamGeneralInfoSeasonStandings />
            <TeamGeneralInfoSeasonBestPlayer />
          </div>
        </div>
        <div className="grow mt-[24px] lg:mt-0">
          <h3 className="text-white text-[20px] font-bold">최근 구단 관련 뉴스 / 소식 👀 </h3>
          <TeamGeneralInfoPopularPosts />
          <h3 className="text-white text-[20px] font-bold mt-[24px]">구단 정보</h3>
          <TeamGeneralInfoFranchiseInfo />
        </div>
      </div>
    </div>
  )
}