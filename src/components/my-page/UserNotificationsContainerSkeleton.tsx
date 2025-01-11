const UserNotificationsContainerSkeleton = () => {
  return (
    <div className="px-[8px] py-[16px] rounded-full flex items-center animate-pulse gap-[10%] lg:gap-[2%]">
      <div className="w-[5%]">
      </div>
      <div className="w-[60%] lg:w-[55%] flex items-center gap-[24px]">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative">
          <div className="w-full h-full bg-white/10" />
        </div>
        <div className="grow p-[8px] bg-white/10 rounded-full" />
      </div>
      <div className="hidden lg:block lg:w-[15%]" />
      <div className="w-[25%] lg:w-[15%]" />
      <div className="w-[10%] lg:w-[5%]" />
    </div>
  );
}

export default UserNotificationsContainerSkeleton;