'use client'

import UserNotificationsContainer from "@/components/my-page/UserNotificationsContainer";
import UserNotificationsFilter from "@/components/my-page/UserNotificationsFilter";

const NotificationsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <UserNotificationsFilter />
      <UserNotificationsContainer />
    </div>
  );
}

export default NotificationsPage;