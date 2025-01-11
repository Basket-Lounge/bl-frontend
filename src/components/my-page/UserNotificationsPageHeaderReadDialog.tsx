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
import { markAllNotificationsAsRead } from "@/api/notification.api";
import { TDialogSize } from "@/models/common.models";


const UserNotificationsPageHeaderReadDialog = () => {
  const store = useContext(MyPageStoreContext);
  const setNotificationsActionTaken = useStore(store, (state) => state.setNotificationsActionTaken);
  const currentPageNotificationIds = useStore(store, (state) => state.currentPageNotificationIds);
  const setCurrentPageNotificationIds = useStore(store, (state) => state.setCurrentPageNotificationIds);
  const notificationsReadDialogOpen = useStore(store, (state) => state.notificationsReadDialogOpen);
  const setNotificationsReadDialogOpen = useStore(store, (state) => state.setNotificationsReadDialogOpen);

  const handleOpen = (value: TDialogSize | null) => setNotificationsReadDialogOpen(value); 

  const markNotificationsAsReadMutation = useMutation({ 
    mutationFn: (ids: string[]) => {
      return markAllNotificationsAsRead(ids);
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

  const handleMarkNotificationsAsReadClick = () => {
    const ids = currentPageNotificationIds.filter((item) => item.checked).map((item) => item.id);
    markNotificationsAsReadMutation.mutate(ids);
  }

  return (
    <Dialog 
      size={notificationsReadDialogOpen || 'md'}
      handler={handleOpen} 
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined} 
      open={notificationsReadDialogOpen !== null}
    >
      <DialogHeader 
        color="blue"
        title="Dialog Header"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {itemsChecked > 0 ? (
          <h3 className="text-[16px] font-bold">선택 알림 읽음 표시</h3>
        ) : (
          <h3 className="text-[16px] font-bold">모든 알림 읽음 표시</h3>
        )}
      </DialogHeader>
      <DialogBody 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      >
        {itemsChecked > 0 ? (
          <p className="text-[14px] lg:text-[16px] font-medium">선택한 알림을 읽음 표시하시겠습니까?</p>
        ) : (
          <p className="text-[14px] lg:text-[16px] font-medium">모든 알림을 읽음 표시하시겠습니까?</p>
        )}
      </DialogBody>
      <DialogFooter 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
        className="flex justify-end gap-[16px]"
      >
        <RegularButton
          text="확인"
          size="small"
          bgColor="bg-color1"
          onClick={handleMarkNotificationsAsReadClick}
          pending={markNotificationsAsReadMutation.isPending}
          disabled={markNotificationsAsReadMutation.isPending}
        />
        <RegularButton
          text="취소"
          size="small"
          bgColor="bg-color1"
          onClick={() => handleOpen(null)}
          disabled={markNotificationsAsReadMutation.isPending}
        />
      </DialogFooter>
    </Dialog>
  );
}

export default UserNotificationsPageHeaderReadDialog;