import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import NotificationContainer from "./NotificationContainer";
import { useQuery } from "@tanstack/react-query";
import { getUnreadNotificationCount } from "@/api/notification.api";
import ButtonLoading from "../ButtonLoading";
import NotificationButtonUnreadCount from "./NotificationButtonUnreadCount";
import Image from "next/image";
import { useEffect } from "react";
import { useNotificationStore } from "@/stores/notification.stores";


const NotificationPopover = () => {
  const {
    isHeaderUnreadNotificationCountChanged,
    setIsHeaderUnreadNotificationCountChanged,
  } = useNotificationStore();

  const unreadCountQuery = useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: async () => {
      return await getUnreadNotificationCount();
    }
  });

  useEffect(() => {
    if (isHeaderUnreadNotificationCountChanged) {
      unreadCountQuery.refetch();
      setIsHeaderUnreadNotificationCountChanged(false);
    }
  }, [isHeaderUnreadNotificationCountChanged]);

  return (
    <div>
      <Popover
        placement="bottom"
      >
        <PopoverHandler>
          { unreadCountQuery.isLoading || unreadCountQuery.isRefetching ? (
            <ButtonLoading />
          ) : (
            <button className="relative">
              <NotificationButtonUnreadCount count={unreadCountQuery.data} />
              <Image
                src="/icons/notifications_24dp_FFFFFF.svg"
                alt="menu"
                width={28}
                height={20}
              />
            </button>
          )}
        </PopoverHandler>
        <PopoverContent 
          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}
          className="p-0 border-none z-50"
        >
          <NotificationContainer />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default NotificationPopover;