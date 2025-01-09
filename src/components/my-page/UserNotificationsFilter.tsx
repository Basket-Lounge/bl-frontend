import FilterButton from "../common/FilterButton";
import UserNotificationsSortButtonOptionsContainer from "./UserNotificationsSortButtonOptionsContainer";


const UserNotificationsFilter = () => {
  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <FilterButton name="정렬">
          <UserNotificationsSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
      </div>
    </div>
  );
}

export default UserNotificationsFilter;