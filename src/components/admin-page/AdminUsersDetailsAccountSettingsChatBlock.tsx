import React, { ChangeEventHandler, useContext, useEffect, useState } from "react";
import { Switch } from "@material-tailwind/react";
import { UserManagementStoreContext } from '@/stores/admin.stores';
import { useStore } from "zustand";


const AdminUsersDetailsAccountSettingsChatBlock = () => {
  const store = useContext(UserManagementStoreContext);
  const isChatBlocked = useStore(store, (state) => state.isChatBlocked);
  const [newIsChatBlocked, setNewIsChatBlocked] = useState<boolean>(isChatBlocked);

  const handleChatBlock : ChangeEventHandler<HTMLInputElement> = () => {
    setNewIsChatBlocked(!newIsChatBlocked);
  }

  useEffect(() => {
    setNewIsChatBlocked(isChatBlocked);
  }, [isChatBlocked]);

  return (
    <div>
      <div className="mt-[16px] w-full flex gap-[16px]">
        <Switch 
          checked={newIsChatBlocked}
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