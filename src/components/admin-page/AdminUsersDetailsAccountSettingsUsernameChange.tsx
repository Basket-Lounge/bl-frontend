import { UserManagementStoreContext } from "@/app/admin/users/[userId]/layout";
import React, { ChangeEventHandler, useContext, useEffect, useRef, useState } from "react";
import { useStore } from "zustand";


const AdminUsersDetailsAccountSettingsUsernameChange = () => {
  const store = useContext(UserManagementStoreContext);
  const username = useStore(store, (state) => state.username);
  const setUsername = useStore(store, (state) => state.setUsername);

  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const handleUsernameChange : ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsername(e.target.value);
  }

  useEffect(() => {
    if (!username) {
      labelRef.current?.classList.add('opacity-100'); 
      labelRef.current?.classList.remove('opacity-0', 'group-focus-within:opacity-100');
    } else {
      labelRef.current?.classList.remove('opacity-100');
      labelRef.current?.classList.add('opacity-0', 'group-focus-within:opacity-100');
    }
  }, [username]);

  return (
    <div className="mt-[16px]">
      <div className="relative group">
        <label 
          ref={labelRef}
          htmlFor="username" 
          className="transition-all duration-200 text-white/50 px-[16px] py-[16px] text-[16px] absolute top-0 left-0 bottom-0 group-focus-within:text-gray-100 group-focus-within:-top-[50%] group-focus-within:text-[14px] group-focus-within:z-30 z-10"
        >
          아이디
        </label>
        <input
          ref={inputRef}
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="w-full bg-color3 text-white rounded-lg px-[16px] py-[16px] text-[16px] placeholder-[#8d8d8d] z-20 group-focus-within:outline-none"
        />
      </div>
    </div>
  );
}

export default AdminUsersDetailsAccountSettingsUsernameChange;