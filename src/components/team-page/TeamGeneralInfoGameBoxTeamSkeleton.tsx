const TeamGeneralInfoGameBoxTeamSkeleton : React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[16px]">
        <div className="w-[48px] h-[48px] bg-transparent rounded-full relative bg-color2">
        </div>
        <div>
          <div className="h-[20px] w-full bg-color2 rounded-full"></div>
          <div className="h-[16px] w-full mt-[8px] bg-color2 rounded-full"></div>
        </div>
      </div>
      <div className="h-[24px] w-full bg-transparent rounded-full"></div>
    </div>
  )
}

export default TeamGeneralInfoGameBoxTeamSkeleton;