const TodayPopularPostSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-md">
      <div className="p-[24px] bg-color3 rounded-md w-full flex flex-col gap-[24px]">
        <div>
          <div className="text-[20px] font-semibold bg-color2 rounded-full">
            <span className="opacity-0">title</span>
          </div>
          <div className="mt-[16px] flex items-center gap-[16px]">
            <div className="rounded-full bg-color2 w-[48px] h-[48px]">
            </div>
            <div className="bg-color2 text-[16px] rounded-full">
              <span className="opacity-0">username</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[24px]"> 
          <div className="gap-[12px] flex items-center">
            <div className="w-[24px] h-[24px] bg-color2 rounded-full"></div>
            <div className="bg-color2 text-[16px] rounded-full">
              <span className="opacity-0">100</span>
            </div>
          </div>
          <div className="gap-[12px] flex items-center">
            <div className="w-[24px] h-[24px] bg-color2 rounded-full"></div>
            <div className="bg-color2 text-[16px] rounded-full">
              <span className="opacity-0">100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodayPopularPostSkeleton;