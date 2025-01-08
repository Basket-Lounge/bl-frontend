import { INotificationPaginationResult } from "@/models/notification.models";
import NotificationHeaderSectionButton from "./NotificationHeaderSectionButton";
import { useNotificationStore } from "@/stores/notification.stores";
import { useMutation } from "@tanstack/react-query";
import { markAllNotificationsAsRead } from "@/api/notification.api";
import TextButton from "../TextButton";


interface INotificationHeaderProps {
  pending: boolean;
  data: INotificationPaginationResult | undefined;
}

const NotificationHeader = (
  { pending, data }: INotificationHeaderProps
) => {
  const { 
    currentSection,
    setIsMarkingNotificationAsReadClicked,
    setIsHeaderUnreadNotificationCountChanged
  } = useNotificationStore();

  const markAllAsReadMutation = useMutation({
    mutationFn: () => {
      return markAllNotificationsAsRead();
    },
    onSuccess: () => {
      setIsHeaderUnreadNotificationCountChanged(true);
      setIsMarkingNotificationAsReadClicked(true);
    }
  })

  return (
    <div className="pt-[24px] pr-[24px] pl-[24px] pb-[16px] flex flex-col items-stretch gap-[24px]">
      <div className="text-white text-[16px] flex items-center justify-between gap-[8px]">
        <div className="flex items-center gap-[8px]">
          <span className="font-bold">
            알림
          </span> 
        </div>
        {!pending && (
          <TextButton
            text="전체 읽음 표시"
            size="small"
            handleClick={() => markAllAsReadMutation.mutate()}
            pending={markAllAsReadMutation.isPending}
            disabled={markAllAsReadMutation.isPending}
          />
        )}
      </div>
      <div className="flex items-center gap-[24px] text-white text-[14px]">
        <NotificationHeaderSectionButton 
          pending={currentSection === "all" && pending}
          count={data?.count}
          name="전체" 
          keyName="all" 
        />
        <NotificationHeaderSectionButton 
          pending={currentSection === "unread" && pending}
          count={data?.count}
          name="안 읽음" 
          keyName="unread" 
        />
      </div>
    </div>
  )
}

export default NotificationHeader;