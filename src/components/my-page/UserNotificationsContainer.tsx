'use client'

import UserNotificationsContainerHeader from "./UserNotificationsContainerHeader";
import UserNotificationsContainerList from "./UserNotificationsContainerList";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "@/api/notification.api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useStore } from "zustand";
import Pagination from "../common/Pagination";
import { AxiosError } from "axios";
import { useAuthStore } from "@/stores/auth.stores";


const UserNotificationsContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    userId
  } = useAuthStore();

  const store = useContext(MyPageStoreContext);
  const notificationsArgumentsModified = useStore(store, (state) => state.notificationsArgumentsModified);
  const setNotificationsArgumentsModified = useStore(store, (state) => state.setNotificationsArgumentsModified);
  const notificationsActionTaken = useStore(store, (state) => state.notificationsActionTaken);
  const setNotificationsActionTaken = useStore(store, (state) => state.setNotificationsActionTaken);
  const currentPageNotificationIds = useStore(store, (state) => state.currentPageNotificationIds);
  const setCurrentPageNotificationIds = useStore(store, (state) => state.setCurrentPageNotificationIds);

  const page = parseInt(searchParams.get("page") || '1');
  const sort = searchParams.get("sort") || '';
  const types = searchParams.get("types") || '';

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const allNotificationQuery = useQuery({
    queryKey: ["notifications", "all", "pagination", page, { sort, types }],
    queryFn: async () => {
      return await getAllNotifications(
        page,
        { sort, types }, 
      );
    },
    throwOnError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        setNotificationsArgumentsModified(true);
        router.push(pathname + '?' + createQueryString('page', '1'));
        return false;
      }

      return true;
    },
  });

  const handlePageChange = (newPage: number) => {
    setNotificationsArgumentsModified(true);
    router.push(pathname + '?' + createQueryString('page', newPage.toString()));
  }

  useEffect(() => {
    if (notificationsArgumentsModified) {
      allNotificationQuery.refetch();
      setNotificationsArgumentsModified(false);
    }
  }, [page, sort, types]);

  useEffect(() => {
    if (notificationsActionTaken) {
      allNotificationQuery.refetch();
      setNotificationsActionTaken(false);
    }
  }, [notificationsActionTaken]);

  useEffect(() => {
    if (
      (allNotificationQuery.isLoading == false && allNotificationQuery.isRefetching == false) &&
      allNotificationQuery.data && allNotificationQuery.data.results.length !== 0
    ) {
      const newNotificationIds = allNotificationQuery.data.results.map((notification) => {
        return {
          id: notification.id,
          checked: currentPageNotificationIds.find((item) => item.id === notification.id)?.checked || false,
        }
      });
      setCurrentPageNotificationIds(newNotificationIds);
    } else {
      setCurrentPageNotificationIds([]);
    }
  }, [allNotificationQuery.isLoading, allNotificationQuery.isRefetching, allNotificationQuery.data]);

  if (
    allNotificationQuery.isLoading || allNotificationQuery.isRefetching
  ) {
    return (
      <div className="items-stretch flex flex-col">
        <UserNotificationsContainerHeader />
        <UserNotificationsContainerList notifications={[]} />
      </div>
    );
  }

  if (allNotificationQuery.isError || allNotificationQuery.isRefetchError) {
    return (
      <div className="items-stretch flex flex-col">
        <UserNotificationsContainerHeader />
        <UserNotificationsContainerList notifications={[]} />
      </div>
    );
  }

  return (
    <div className="items-stretch flex flex-col">
      <UserNotificationsContainerHeader />
      <UserNotificationsContainerList notifications={allNotificationQuery.data!.results} />
      <Pagination
        currentPageNumber={page}
        lastPageNumber={allNotificationQuery.data!.last_page}
        firstPageCallback={
          allNotificationQuery.data!.first_page ? () => handlePageChange(1) : undefined
        }
        previousCallback={
          allNotificationQuery.data!.previous ? () => handlePageChange(page - 1) : undefined
        }
        nextCallback={
          allNotificationQuery.data!.next ? () => handlePageChange(page + 1) : undefined
        }
        lastPageCallback={
          allNotificationQuery.data!.last_page ? () => handlePageChange(allNotificationQuery.data!.last_page) : undefined
        }
        disabled={allNotificationQuery.isLoading || allNotificationQuery.isRefetching}
      />
    </div>
  );
}

export default UserNotificationsContainer;