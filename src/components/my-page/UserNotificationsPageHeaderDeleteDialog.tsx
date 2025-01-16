'use client'

import { useContext, useMemo } from "react";
import RegularButton from "../common/RegularButton";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useStore } from "zustand";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { deleteAllNotifications } from "@/api/notification.api";
import { TDialogSize } from "@/models/common.models";


const UserNotificationsPageHeaderDeleteDialog = () => {
  const store = useContext(MyPageStoreContext);
  const setNotificationsActionTaken = useStore(store, (state) => state.setNotificationsActionTaken);
  const currentPageNotificationIds = useStore(store, (state) => state.currentPageNotificationIds);
  const setCurrentPageNotificationIds = useStore(store, (state) => state.setCurrentPageNotificationIds);
  const notificationsDeleteDialogOpen = useStore(store, (state) => state.notificationsDeleteDialogOpen);
  const setNotificationsDeleteDialogOpen = useStore(store, (state) => state.setNotificationsDeleteDialogOpen);

  const handleOpen = (value: TDialogSize | null) => setNotificationsDeleteDialogOpen(value);

  const deleteNotificationsMutation = useMutation({
    mutationFn: (ids: string[]) => {
      return deleteAllNotifications(ids);
    },
    onSuccess: () => {
      handleOpen(null);
      setCurrentPageNotificationIds([]);
      setNotificationsActionTaken(true);
    }
  });

  const itemsChecked = useMemo(() => {
    return currentPageNotificationIds.filter((item) => item.checked).length;
  }, [currentPageNotificationIds]);

  const handleDeleteNotificationsClick = () => {
    const ids = currentPageNotificationIds.filter((item) => item.checked).map((item) => item.id);
    deleteNotificationsMutation.mutate(ids);
  }

  return (
    <Dialog 
      size={notificationsDeleteDialogOpen || 'md'}
      handler={handleOpen} 
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined} 
      open={notificationsDeleteDialogOpen !== null}
      className="bg-white"
    >
      <DialogHeader 
        color="blue"
        title="Dialog Header"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {itemsChecked > 0 ? (
          <h3 className="text-[16px] font-bold">선택 알림 삭제</h3>
        ) : (
          <h3 className="text-[16px] font-bold">모든 알림 삭제</h3>
        )}
      </DialogHeader>
      <DialogBody 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      >
        {itemsChecked > 0 ? (
          <p className="text-[14px] lg:text-[16px] font-medium">선택한 알림을 삭제하시겠습니까?</p>
        ) : (
          <p className="text-[14px] lg:text-[16px] font-medium">모든 알림을 삭제하시겠습니까?</p>
        )}
      </DialogBody>
      <DialogFooter 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
        className="flex justify-end gap-[16px]"
      >
        <RegularButton
          size="small"
          bgColor="bg-color1"
          onClick={handleDeleteNotificationsClick}
          pending={deleteNotificationsMutation.isPending}
          disabled={deleteNotificationsMutation.isPending}
        >
          {deleteNotificationsMutation.isPending ? '삭제 중...' : '삭제'}
        </RegularButton>
        <RegularButton
          size="small"
          bgColor="bg-color1"
          onClick={() => handleOpen(null)}
          disabled={deleteNotificationsMutation.isPending}
        >
          취소
        </RegularButton>
      </DialogFooter>
    </Dialog>
  );
}

export default UserNotificationsPageHeaderDeleteDialog;