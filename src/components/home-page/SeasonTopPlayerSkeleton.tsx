const SeasonTopPlayerSkeleton = () => {
  return (
    <div className="p-[24px] bg-color3 rounded-md flex flex-col gap-[16px] animate-pulse">
      {/* <div className="w-[36px] h-[36px] rounded-full relative bg-color2">
        <p className="text-[20px] font-bold absolute top-[50%] right-[50%] -translate-y-[50%] translate-x-[50%] text-black">
          <span className="opacity-0">1</span>
        </p>
      </div> */}
      <div className="w-[128px] h-[128px] rounded-full relative bg-color2 mx-auto"></div>
      <div className="h-[16px] w-full bg-color2 rounded-full"></div>
      <div className="flex items-center justify-between">
        <div className="text-center w-1/3">
          <div className="h-[14px] w-full bg-color2 rounded-full"></div>
          <div className="h-[24px] w-full mt-[8px] bg-color2 rounded-full"></div>
        </div>
        <div className="text-center w-1/3">
          <div className="h-[14px] w-full bg-color2 rounded-full"></div>
          <div className="h-[24px] w-full mt-[8px] bg-color2 rounded-full"></div>
        </div>
        <div className="text-center w-1/3">
          <div className="h-[14px] w-full bg-color2 rounded-full"></div>
          <div className="h-[24px] w-full mt-[8px] bg-color2 rounded-full"></div>
        </div>
      </div>
      <div className="w-full bg-color2 text-[16px] font-semibold py-[12px] text-center rounded-full">
        <span className="opacity-0">선수 상세보기</span>
      </div>
    </div>
  );
};

export default SeasonTopPlayerSkeleton;