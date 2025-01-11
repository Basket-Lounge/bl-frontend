import UserNotificationsContainerSkeleton from "./UserNotificationsContainerSkeleton";


const UserNotificationsContainerSkeletonList = () => {
  return (
    <div className="divide-y-[1px] divide-color3">
      <UserNotificationsContainerSkeleton />
      <UserNotificationsContainerSkeleton />
      <UserNotificationsContainerSkeleton />
      <UserNotificationsContainerSkeleton />
      <UserNotificationsContainerSkeleton />
    </div>
  );
}

export default UserNotificationsContainerSkeletonList;