import Image from "next/image";
import NotificationCardMessageParser from "./NotificationCardMessageParser";
import { INotification } from "@/models/notification.models";
import NotificationCardUnreadMarker from "./NotificationCardUnreadMarker";
import { useAuthStore } from "@/stores/auth.stores";


interface INotificationCardProps {
  notification: INotification;
}

const NotificationCard = ({ notification }: INotificationCardProps) => {
  const {
    userId
  } = useAuthStore();

  const userReadStatus = notification.recipients.find(
    (recipient) => recipient.recipient_data.id === userId
  )

  return (
    <div className="px-[24px] py-[16px] flex items-start gap-[24px]">
      <div className="relative">
        {userReadStatus && userReadStatus.read === false && (
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
      <NotificationCardMessageParser 
        message={notification.contents.Korean}
        redirectURL={notification.redirect_url}
      />
    </div>
  )
}

export default NotificationCard;