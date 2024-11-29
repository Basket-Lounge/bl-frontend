import React, { ChangeEventHandler, useContext } from "react";
import { Switch } from "@material-tailwind/react";
import { useStore } from "zustand";
import { MyPageStoreContext } from "@/stores/myPage.stores";


const UserAccountSettingsChatBlock = () => {
  const store = useContext(MyPageStoreContext);
  const isChatBlocked = useStore(store, (state) => state.isChatBlocked);
  const setIsChatBlocked = useStore(store, (state) => state.setIsChatBlocked);

  const handleChatBlock : ChangeEventHandler<HTMLInputElement> = () => {
    setIsChatBlocked(!isChatBlocked);
  }

  return (
    <div>
      <div className="mt-[16px] w-full flex gap-[16px]">
        <Switch 
          checked={isChatBlocked}
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

export default UserAccountSettingsChatBlock;