import React, { ChangeEventHandler, useContext } from "react";
import { Switch } from "@material-tailwind/react";
import { useStore } from "zustand";
import { MyPageStoreContext } from "@/stores/myPage.stores";


const UserAccountSettingsProfile = () => {
  const store = useContext(MyPageStoreContext);
  const isProfileVisible = useStore(store, (state) => state.isProfileVisible);
  const setIsProfileVisible = useStore(store, (state) => state.setIsProfileVisible);

  const handleProfileVisibility : ChangeEventHandler<HTMLInputElement> = () => {
    setIsProfileVisible(!isProfileVisible);
  }

  return (
    <div>
      <div className="mt-[16px] w-full flex gap-[16px]">
        <Switch 
          checked={isProfileVisible}
          onChange={handleProfileVisibility}
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined} 
          crossOrigin={undefined} 
          id="custom-switch-component"
          ripple={false}
          className="h-full w-full checked:bg-[#2ec946]"
          containerProps={{
            className: "w-11 h-6",
          }}
          circleProps={{
            className: "before:hidden left-0.5 border-none",
          }}
        />
        <label htmlFor="custom-switch-component" className="text-white">프로필 공개</label>
      </div>
    </div>
  );
}

export default UserAccountSettingsProfile;