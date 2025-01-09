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


const UserNotificationsContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const store = useContext(MyPageStoreContext);
  const notificationsArgumentsModified = useStore(store, (state) => state.notificationsArgumentsModified);
  const setNotificationsArgumentsModified = useStore(store, (state) => state.setNotificationsArgumentsModified);
  const notificationsActionTaken = useStore(store, (state) => state.notificationsActionTaken);
  const setNotificationsActionTaken = useStore(store, (state) => state.setNotificationsActionTaken);

  const page = parseInt(searchParams.get("page") || '1');
  const sort = searchParams.get("sort") || '';
  const type = searchParams.get("type") || '';

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const allNotificationQuery = useQuery({
    queryKey: ["notifications", "all", "pagination", page],
    queryFn: async () => {
      return await getAllNotifications(
        page,
        { sort }, 
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
  }, [page, sort, type]);

  useEffect(() => {
    if (notificationsActionTaken) {
      allNotificationQuery.refetch();
      setNotificationsActionTaken(false);
    }
  }, [notificationsActionTaken]);

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