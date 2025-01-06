import { useNotificationStore } from "@/stores/notification.stores";
import NotificationHeader from "./NotificationHeader";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications, getUnreadNotifications } from "@/api/notification.api";
import { useEffect } from "react";
import NotificationCardContainer from "./NotificationCardContainer";
import Pagination from "../Pagination";


const NotificationContainer = () => {
  /*
  TODO:
  API-related tasks:
  - Create an API function that fetches notifications.
  - Create an API function that marks all notifications as read.
  - Create an API function that marks a notification as read.

  Component-related tasks:
  - Implement the NotificationHeader component.
    - Display the total number of unread notifications.
  - Implement the NotificationContent component.
    - Create a notification card component.
    - Create a notification card skeleton component.
    - Create a list pagination component.

  Util-related tasks:
  - Create a function that formats the notification timestamp.
  - Create a function that formats the notification message.
  */

  const {
    currentSection,
    isSectionChanged,
    setIsSectionChanged,

    isPageChanged,
    setIsPageChanged,

    allNotificationPaginationPage,
    setAllNotificationPaginationPage,

    unreadNotificationPaginationPage,
    setUnreadNotificationPaginationPage,
  } = useNotificationStore();

  const allNotificationQuery = useQuery({
    queryKey: ["notifications", "all"],
    queryFn: async () => {
      return await getAllNotifications(allNotificationPaginationPage, { sort: "-created_at" });
    },
  });

  const unreadNotificationQuery = useQuery({
    queryKey: ["notifications", "unread"],
    queryFn: async () => {
      return await getUnreadNotifications(unreadNotificationPaginationPage, { sort: "-created_at" });
    },
  });

  const handleAllNotificationPageChange = (page: number) => {
    setIsPageChanged(true);
    setAllNotificationPaginationPage(page);
  }

  const handleUnreadNotificationPageChange = (page: number) => {
    setIsPageChanged(true);
    setUnreadNotificationPaginationPage(page);
  }

  useEffect(() => {
    if (isSectionChanged) {
      if (currentSection === "all") {
        allNotificationQuery.refetch();
      } else {
        unreadNotificationQuery.refetch();
      }
      setIsSectionChanged(false);
    }
  }, [currentSection]);

  useEffect(() => {
    if (isPageChanged) {
      if (currentSection === "all") {
        allNotificationQuery.refetch();
      } else {
        unreadNotificationQuery.refetch();
      }
      setIsPageChanged(false);
    }
  }, [allNotificationPaginationPage, unreadNotificationPaginationPage]);

  return (
    <div
      className={`w-[350px] lg:w-[400px] bg-color3 rounded-md z-50 divide-y divide-white flex flex-col items-stretch shadow-xl`}
    >
      <NotificationHeader
        pending={currentSection === "all" ? 
          allNotificationQuery.isLoading || allNotificationQuery.isRefetching :
          unreadNotificationQuery.isLoading || unreadNotificationQuery.isRefetching
        }
        data={currentSection === "all" ? allNotificationQuery.data : unreadNotificationQuery.data}
      />
      <NotificationCardContainer
        pending={currentSection === "all" ? 
          allNotificationQuery.isLoading || allNotificationQuery.isRefetching :
          unreadNotificationQuery.isLoading || unreadNotificationQuery.isRefetching
        }
        data={currentSection === "all" ? allNotificationQuery.data : unreadNotificationQuery.data}
      />
      <Pagination
        currentPageNumber={currentSection === "all" ? allNotificationPaginationPage : unreadNotificationPaginationPage}
        previousCallback={
          currentSection === "all" ?
            allNotificationQuery.data?.previous ?
              () => handleAllNotificationPageChange(allNotificationPaginationPage - 1) :
              undefined :
            unreadNotificationQuery.data?.previous ?
              () => handleUnreadNotificationPageChange(unreadNotificationPaginationPage - 1) :
              undefined
        }
        nextCallback={
          currentSection === "all" ?
            allNotificationQuery.data?.next ?
              () => handleAllNotificationPageChange(allNotificationPaginationPage + 1) :
              undefined :
            unreadNotificationQuery.data?.next ?
              () => handleUnreadNotificationPageChange(unreadNotificationPaginationPage + 1) :
              undefined
        }
      />
    </div>
  )
}

export default NotificationContainer;