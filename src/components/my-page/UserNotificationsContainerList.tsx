import { INotification } from "@/models/notification.models";
import UserNotificationsContainerListItem from "./UserNotificationsContainerListItem";


const UserNotificationsContainerList = (
  { notifications }: { notifications: INotification[] }
) => {
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