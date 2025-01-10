import { Checkbox } from "@material-tailwind/react";
import UserNotificationsContainerHeaderButton from "./UserNotificationsContainerHeaderButton";
import UserNotificationsContainerHeaderTypesContainer from "./UserNotificationsContainerHeaderTypesContainer";
import UserNotificationsContainerHeaderCreatedAtContainer from "./UserNotificationsContainerHeaderCreatedAtContainer";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useContext } from "react";
import { useStore } from "zustand";


const UserNotificationsContainerHeader = () => {
  const store = useContext(MyPageStoreContext);
  const currentPageNotificationIds = useStore(store, (state) => state.currentPageNotificationIds);
  const setCurrentPageNotificationIds = useStore(store, (state) => state.setCurrentPageNotificationIds);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      const newCurrentPageNotificationIds = currentPageNotificationIds.map((item) => {
        return {
          ...item,
          checked: true
        }
      });

      setCurrentPageNotificationIds(newCurrentPageNotificationIds);
    } else {
      const newCurrentPageNotificationIds = currentPageNotificationIds.map((item) => {
        return {
          ...item,
          checked: false
        }
      });
      
      setCurrentPageNotificationIds(newCurrentPageNotificationIds);
    }
  }

  return (
    <div className="p-[8px] rounded-full bg-color1 flex items-center">
      <div className="w-[5%]">
        <Checkbox 
          color="blue"
          defaultChecked={false} 
          onChange={handleCheckboxChange}
          onPointerEnterCapture={() => {}} 
          onPointerLeaveCapture={() => {}}
          crossOrigin=""
          className="w-[16px] h-[16px]"
        />
      </div>
      <p className="text-[16px] font-medium grow">내용</p>
      <UserNotificationsContainerHeaderButton
        text="알림 종류"
        className="text-[16px] font-medium w-[15%] text-left"
        queryKey="types"
      >
        <UserNotificationsContainerHeaderTypesContainer />
      </UserNotificationsContainerHeaderButton>
      <UserNotificationsContainerHeaderButton
        text="생성 날짜"
        className="text-[16px] font-medium w-[20%] text-left"
        queryKey="sort"
      >
        <UserNotificationsContainerHeaderCreatedAtContainer /> 
      </UserNotificationsContainerHeaderButton>
      <p className="text-[16px] font-medium w-[5%]">설정</p>
    </div>
  );
}

export default UserNotificationsContainerHeader;