import React, { ChangeEventHandler } from "react";
import { Switch } from "@material-tailwind/react";


interface IAdminUsersDetailsAccountSettingsUserProfileProps {
  isChecked: boolean;
  updateProfileVisibility: () => void;
}

const AdminUsersDetailsAccountSettingsUserProfile = (
  {isChecked, updateProfileVisibility}: IAdminUsersDetailsAccountSettingsUserProfileProps
) => {
  const handleProfileVisibility : ChangeEventHandler<HTMLInputElement> = () => {
    updateProfileVisibility();
  }

  return (
    <div>
      <h3 className="text-white text-[20px] font-bold">계정 설정</h3>
      <div className="mt-[16px] w-full flex gap-[16px]">
        <Switch 
          checked={isChecked} 
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

export default AdminUsersDetailsAccountSettingsUserProfile;