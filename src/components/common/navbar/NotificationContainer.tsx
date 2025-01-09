import { useNotificationStore } from "@/stores/notification.stores";
import NotificationHeader from "./NotificationHeader";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications, getUnreadNotifications } from "@/api/notification.api";
import { useEffect } from "react";
import NotificationCardContainer from "./NotificationCardContainer";
import Pagination from "../Pagination";
import { AxiosError } from "axios";


const NotificationContainer = () => {
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

    isMarkingNotificationAsReadClicked,
    setIsMarkingNotificationAsReadClicked
  } = useNotificationStore();

  const allNotificationQuery = useQuery({
    queryKey: ["notifications", "all"],
    queryFn: async () => {
      return await getAllNotifications(
        allNotificationPaginationPage, 
        { sort: "-created_at", context: "header" }
      );
    },
    throwOnError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        setIsPageChanged(true);
        setAllNotificationPaginationPage(1);
      }
      return false
    },
  });

  const unreadNotificationQuery = useQuery({
    queryKey: ["notifications", "unread"],
    queryFn: async () => {
      return await getUnreadNotifications(
        unreadNotificationPaginationPage, 
        { sort: "-created_at", context: "header" }
      );
    },
    throwOnError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        setIsPageChanged(true);
        setUnreadNotificationPaginationPage(1);
      }
      return false
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

  useEffect(() => {
    if (isMarkingNotificationAsReadClicked) {
      if (currentSection === "all") {
        allNotificationQuery.refetch();
      } else {
        unreadNotificationQuery.refetch();
      }
      setIsMarkingNotificationAsReadClicked(false);
    }
  }, [isMarkingNotificationAsReadClicked]);

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
        currentPageNumber={
          currentSection === "all" ? allNotificationPaginationPage : unreadNotificationPaginationPage
        }
        lastPageNumber={
          currentSection === "all" ? allNotificationQuery.data?.last_page : unreadNotificationQuery.data?.last_page
        }
        firstPageCallback={
          currentSection === "all" ?
            allNotificationQuery.data?.first_page ?
              () => handleAllNotificationPageChange(1) :
              undefined :
            unreadNotificationQuery.data?.first_page ?
              () => handleUnreadNotificationPageChange(1) :
              undefined
        }
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
        lastPageCallback={
          currentSection === "all" ?
            allNotificationQuery.data?.last_page ?
              () => handleAllNotificationPageChange(allNotificationQuery.data!.last_page) :
              undefined :
            unreadNotificationQuery.data?.last_page ?
              () => handleUnreadNotificationPageChange(unreadNotificationQuery.data!.last_page) :
              undefined
        }
        disabled={
          allNotificationQuery.isLoading || allNotificationQuery.isRefetching ||
          unreadNotificationQuery.isLoading || unreadNotificationQuery.isRefetching
        }
      />
    </div>
  )
}

export default NotificationContainer;