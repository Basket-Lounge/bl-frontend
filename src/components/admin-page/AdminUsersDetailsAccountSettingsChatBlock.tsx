import React, { ChangeEventHandler } from "react";
import { Switch } from "@material-tailwind/react";


interface IAdminUsersDetailsAccountSettingsChatBlockProps {
  isChecked: boolean;
  updateChatBlock : () => void;
}

const AdminUsersDetailsAccountSettingsChatBlock = (
  {isChecked, updateChatBlock}: IAdminUsersDetailsAccountSettingsChatBlockProps
) => {
  const handleChatBlock : ChangeEventHandler<HTMLInputElement> = () => {
    updateChatBlock();
  }

  return (
    <div>
      <div className="mt-[16px] w-full flex gap-[16px]">
        <Switch 
          checked={isChecked} 
          onChange={handleChatBlock}
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined} 
          crossOrigin={undefined} 
          id="chat-block-switch"
          ripple={false}
          className="h-full w-full checked:bg-[#2ec946]"
          containerProps={{
            className: "w-11 h-6",
          }}
          circleProps={{
            className: "before:hidden left-0.5 border-none",
          }}
        />
        <label htmlFor="chat-block-switch" className="text-white">채팅 차단</label>
      </div>
    </div>
  );
}

export default AdminUsersDetailsAccountSettingsChatBlock;