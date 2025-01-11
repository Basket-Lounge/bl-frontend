'use client'

import { useContext, useMemo } from "react";
import RegularButton from "../common/RegularButton";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useStore } from "zustand";
import UserNotificationsPageHeaderDeleteDialog from "./UserNotificationsPageHeaderDeleteDialog";
import UserNotificationsPageHeaderReadDialog from "./UserNotificationsPageHeaderReadDialog";


const UserNotificationsPageHeader = () => {
  const store = useContext(MyPageStoreContext);
  const currentPageNotificationIds = useStore(store, (state) => state.currentPageNotificationIds);
  const setNotificationsDeleteDialogOpen = useStore(store, (state) => state.setNotificationsDeleteDialogOpen);
  const setNotificationsReadDialogOpen = useStore(store, (state) => state.setNotificationsReadDialogOpen);

  const itemsChecked = useMemo(() => {
    return currentPageNotificationIds.filter((item) => item.checked).length;
  }, [currentPageNotificationIds]);

  const handleDeleteButtonClick = () => {
    setNotificationsDeleteDialogOpen('md');
  }

  const handleMarkAllAsReadButtonClick = () => {
    setNotificationsReadDialogOpen('md');
  }

  return (
    <>
      <div className="flex justify-between items-end">
        <h3 className="text-white text-[20px] lg:text-[24px] font-bold">알림 관리</h3>
        <div className="flex justify-end items-end gap-[16px]">
          {itemsChecked > 0 ? (
            <RegularButton
              text="선택 삭제"
              size="small"
              bgColor="bg-color1"
              className="hover:bg-color3"
              onClick={handleDeleteButtonClick}
            />
          ) : (
            <RegularButton
              text="전체 삭제"
              size="small"
              bgColor="bg-color1"
              className="hover:bg-color3"
              onClick={handleDeleteButtonClick}
            />
          )}
          {itemsChecked > 0 ? (
            <RegularButton
              text="선택 읽음 표시"
              size="small"
              bgColor="bg-color1"
              className="hover:bg-color3"
              onClick={handleMarkAllAsReadButtonClick}
            />
          ) : (
            <RegularButton
              text="전체 읽음 표시"
              size="small"
              bgColor="bg-color1"
              className="hover:bg-color3"
              onClick={handleMarkAllAsReadButtonClick}
            />
          )}
        </div>
      </div>
      <UserNotificationsPageHeaderDeleteDialog />
      <UserNotificationsPageHeaderReadDialog />
    </>
  );
}

export default UserNotificationsPageHeader;