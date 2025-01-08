import { INotificationPaginationResult } from "@/models/notification.models";
import NotificationCard from "./NotificationCard";
import NotificationCardSkeleton from "./NotificationCardSkeleton";
import CuteErrorMessage from "../CuteErrorMessage";


interface INotificationCardContainerProps {
  pending: boolean;
  data: INotificationPaginationResult | undefined;
}

const NotificationCardContainer = (
  { pending, data }: INotificationCardContainerProps
) => {
  if (pending) {
    return (
      <div className="flex flex-col items-stretch divide-y divide-white/25">
        <NotificationCardSkeleton />
        <NotificationCardSkeleton />
        <NotificationCardSkeleton />
        <NotificationCardSkeleton />
        <NotificationCardSkeleton />
      </div>
    )
  }

  if (data && data.count) {
    return (
      <div className="flex flex-col items-stretch divide-y divide-white/25">
        {data.results.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-stretch divide-y divide-white/25 py-[24px]">
      <CuteErrorMessage error="받은 알림이 없습니다." size="small" />
    </div>
  )
}

export default NotificationCardContainer;