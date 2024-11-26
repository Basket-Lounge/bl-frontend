import TeamGeneralInfoGameBoxTeamSkeleton from "../team-page/TeamGeneralInfoGameBoxTeamSkeleton";


export default function TodayGameSkeleton() {
  return (
    <div className="p-[24px] bg-color3 rounded-md flex flex-col gap-[16px]">
      <TeamGeneralInfoGameBoxTeamSkeleton />
      <TeamGeneralInfoGameBoxTeamSkeleton />
      <div className="bg-color2 rounded-full justify-center py-[12px] w-full" />
      <button 
        className="bg-color2 rounded-full justify-center py-[12px] w-full font-medium"
      >
        <span className="opacity-0">상세보기</span>
      </button>
    </div>
  )
}
