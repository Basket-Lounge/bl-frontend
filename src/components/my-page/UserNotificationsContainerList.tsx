import { INotification } from "@/models/notification.models";
import UserNotificationsContainerListItem from "./UserNotificationsContainerListItem";
import CuteErrorMessage from "../common/CuteErrorMessage";


const UserNotificationsContainerList = (
  { notifications }: { notifications: INotification[] }
) => {
  if (notifications.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage error="받은 알림이 없습니다." />
      </div>
    );
  }

  return (
    <div className="divide-y-[1px] divide-color3">
      {notifications.map((notification) => (
        <UserNotificationsContainerListItem 
          key={notification.id} 
          notification={notification} 
        />
      ))}
    </div>
  );
}

export default UserNotificationsContainerList;