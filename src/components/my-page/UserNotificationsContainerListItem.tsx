import { INotification } from "@/models/notification.models";
import { timeAgoKorean } from "@/utils/common.utils";
import { Checkbox } from "@material-tailwind/react";
import UserNotificationsContainerListItemMessageParser from "./UserNotificationsContainerListItemMessageParser";
import UserNotificationsContainerListItemType from "./UserNotificationsContainerListItemType";
import { useAuthStore } from "@/stores/auth.stores";
import UserNotificationsContainerListItemSettings from "./UserNotificationsContainerListItemSettings";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "@/api/notification.api";
import { useSearchParams } from "next/navigation";
import UserNotificationsContainerListItemSettingsContainer from "./UserNotificationsContainerListItemSettingsContainer";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useStore } from "zustand";


const UserNotificationsContainerListItem = (
  { notification }: { notification: INotification }
) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || '1');

  const queryClient = useQueryClient();
  const {
    userId
  } = useAuthStore();

  const store = useContext(MyPageStoreContext);
  const currentPageNotificationIds = useStore(store, (state) => state.currentPageNotificationIds);
  const setCurrentPageNotificationIds = useStore(store, (state) => state.setCurrentPageNotificationIds);

  const [read, setRead] = useState<boolean>(
    notification.recipients.find(
      (recipient) => recipient.recipient_data.id === userId
    )?.read || false
  );

  const markAsReadMutation = useMutation({
    mutationFn: () => {
      return markNotificationAsRead(notification.id);
    },
    onSuccess: () => {
      setRead(true);
      if (notification.redirect_url) {
        queryClient.invalidateQueries({
          queryKey: ["notifications", "all", "pagination", page],
          exact: true
        });
      }
    }
  });

  const timeAgoInKorean = timeAgoKorean(notification.created_at);

  const handleClick = () => {
    if (read === false && markAsReadMutation.isPending === false) {
      markAsReadMutation.mutate();
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      const newCheckStatusArray = currentPageNotificationIds.map((item) => {
        if (item.id === notification.id) {
          return { ...item, checked: true };
        }

        return item;
      });

      setCurrentPageNotificationIds(
        newCheckStatusArray
      );
    } else {
      const newCheckStatusArray = currentPageNotificationIds.map((item) => {
        if (item.id === notification.id) {
          return { ...item, checked: false };
        }

        return item;
      });

      setCurrentPageNotificationIds(
        newCheckStatusArray
      );
    }
  }

  return (
    <div className="px-[8px] py-[16px] rounded-full flex items-center gap-[10%] lg:gap-[2%]">
      <div className="w-[5%]">
        <Checkbox 
          color="blue"
          defaultChecked={false}
          checked={currentPageNotificationIds.find((item) => item.id === notification.id)?.checked || false}
          onChange={handleCheckboxChange}
          onPointerEnterCapture={() => {}} 
          onPointerLeaveCapture={() => {}}
          crossOrigin=""
          className="w-[16px] h-[16px]"
        />
      </div>
      <UserNotificationsContainerListItemMessageParser 
        message={notification.contents.Korean}
        redirectURL={notification.redirect_url}
        pictureURL={notification.picture_url}
        read={read}
        clickCallback={handleClick}
      />
      <UserNotificationsContainerListItemType templateData={notification.template_data} />
      <p className="text-[14px] lg:text-[16px] w-[25%] lg:w-[15%]">{timeAgoInKorean}</p>
      <UserNotificationsContainerListItemSettings>
        <UserNotificationsContainerListItemSettingsContainer id={notification.id} />
      </UserNotificationsContainerListItemSettings>
    </div>
  );
}

export default UserNotificationsContainerListItem;