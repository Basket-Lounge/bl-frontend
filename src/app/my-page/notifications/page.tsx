import UserNotificationsContainer from "@/components/my-page/UserNotificationsContainer";
import UserNotificationsPageHeader from "@/components/my-page/UserNotificationsPageHeader";


const NotificationsPage: React.FC = () => {
  return (
    <section className="flex flex-col gap-[24px] items-stretch" aria-label="notifications">
      <UserNotificationsPageHeader />
      <UserNotificationsContainer />
    </section>
  );
}

export default NotificationsPage;