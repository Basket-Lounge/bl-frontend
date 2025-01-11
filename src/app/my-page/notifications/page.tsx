import UserNotificationsContainer from "@/components/my-page/UserNotificationsContainer";
import UserNotificationsPageHeader from "@/components/my-page/UserNotificationsPageHeader";

const NotificationsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <UserNotificationsPageHeader />
      <UserNotificationsContainer />
    </div>
  );
}

export default NotificationsPage;