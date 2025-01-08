import Image from "next/image";
import NotificationCardMessageParser from "./NotificationCardMessageParser";
import { INotification } from "@/models/notification.models";
import NotificationCardUnreadMarker from "./NotificationCardUnreadMarker";
import { useAuthStore } from "@/stores/auth.stores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "@/api/notification.api";
import NotificationCardDatetime from "./NotificationCardDatetime";
import { useState } from "react";
import { useNotificationStore } from "@/stores/notification.stores";


interface INotificationCardProps {
  notification: INotification;
}

const NotificationCard = ({ notification }: INotificationCardProps) => {
  const queryClient = useQueryClient();
  const {
    userId
  } = useAuthStore();

  const {
    currentSection,
  } = useNotificationStore();

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
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count"],
        exact: true
      });

      if (currentSection === "unread") {
        queryClient.invalidateQueries({
          queryKey: ["notifications", "unread"],
          exact: true
        });
      }
    }
  });

  const handleNotificationCardClick = () => {
    if (read === false && markAsReadMutation.isPending === false) {
      markAsReadMutation.mutate();
    }
  }

  return (
    <div className="px-[24px] py-[16px] flex items-start gap-[24px]">
      <div className="relative">
        {read === false && (
          <NotificationCardUnreadMarker />
        )}
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative">
          {notification.picture_url ? (
            <Image
              className="w-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
              src={notification.picture_url}
              alt="team-logo"
              width={20}
              height={20}
            />
          ) : (
            <div className="w-full h-full bg-white/25" />
          )}
        </div>
      </div>
      <div className="grow flex flex-col items-start gap-[8px]">
        <NotificationCardMessageParser 
          message={notification.contents.Korean}
          redirectURL={notification.redirect_url}
          clickCallback={handleNotificationCardClick}
        />
        <NotificationCardDatetime datetime={notification.created_at} />
      </div>
    </div>
  )
}

export default NotificationCard;