import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import NotificationContainer from "./NotificationContainer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUnreadNotificationCount } from "@/api/notification.api";
import ButtonLoading from "../ButtonLoading";
import NotificationButtonUnreadCount from "./NotificationButtonUnreadCount";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useNotificationStore } from "@/stores/notification.stores";


const NotificationPopover = () => {
  const {
    currentSection,
    isHeaderUnreadNotificationCountChanged,
    setIsHeaderUnreadNotificationCountChanged,
    allNotificationPaginationPage,
    unreadNotificationPaginationPage,
  } = useNotificationStore();

  const [unreadCount, setUnreadCount] = useState<number | undefined>(undefined);
  const queryClient = useQueryClient();
  const unreadCountQuery = useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: async () => {
      return await getUnreadNotificationCount();
    },
    // Refetch every 60 seconds
    refetchInterval: 60000,
  });

  useEffect(() => {
    if (isHeaderUnreadNotificationCountChanged) {
      unreadCountQuery.refetch();
      setIsHeaderUnreadNotificationCountChanged(false);
    }
  }, [isHeaderUnreadNotificationCountChanged]);

  // Invalidate the query when the unread count changes
  useEffect(() => {
    if (unreadCountQuery.isLoading === false && unreadCountQuery.isRefetching === false) {
      if (unreadCountQuery.data && unreadCountQuery.data !== unreadCount) {
        if (unreadCount !== undefined && currentSection === "unread") {
          queryClient.invalidateQueries({
            queryKey: ["notifications", "unread", unreadNotificationPaginationPage],
            exact: true,
          });
        } else if (unreadCount !== undefined && currentSection === "all") {
          queryClient.invalidateQueries({
            queryKey: ["notifications", "all", allNotificationPaginationPage],
            exact: true,
          });
        }

        setUnreadCount(unreadCountQuery.data);
      }
    }
  }, [unreadCountQuery.isLoading, unreadCountQuery.isRefetching]);

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