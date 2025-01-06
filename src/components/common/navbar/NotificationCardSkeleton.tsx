import NotificationCardUnreadMarker from "./NotificationCardUnreadMarker";

const NotificationCardSkeleton = () => {
  return (
    <div className="px-[24px] py-[16px] flex items-start gap-[24px] animate-pulse">
      <div className="w-[40px] h-[40px] bg-white/25 rounded-full overflow-hidden relative" />
    </div>
  )
}

export default NotificationCardSkeleton;