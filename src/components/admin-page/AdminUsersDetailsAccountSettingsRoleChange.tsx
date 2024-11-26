import { getAllRoles } from "@/api/user.api";
import { UserManagementStoreContext } from "@/app/admin/users/[userId]/layout";
import { translateRoleNameToKorean } from "@/utils/user.utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useStore } from "zustand";


const AdminUsersDetailsAccountSettingsRoleChange = () => {
  const store = useContext(UserManagementStoreContext);
  const role = useStore(store, (state) => state.role);
  const setRole = useStore(store, (state) => state.setRole);

  const labelRef = useRef<HTMLLabelElement>(null);
  const handleRoleChangeClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setRole(parseInt(e.target.value));
  }

  const rolesQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', 'roles'],
    queryFn: async () => {
      return await getAllRoles();
    }
  });

  useEffect(() => {
    if (!role) {
      labelRef.current?.classList.add('opacity-100'); 
      labelRef.current?.classList.remove('opacity-0', 'group-focus-within:opacity-100');
    } else {
      labelRef.current?.classList.remove('opacity-100');
      labelRef.current?.classList.add('opacity-0', 'group-focus-within:opacity-100');
    }
  }, [role]);

  if (rolesQuery.data.length === 0) {
    return null;
  }

  return (
    <div className="mt-[16px]">
      <div className="relative group">
        <label 
          ref={labelRef}
          htmlFor="username" 
          className="transition-all duration-200 text-white/50 px-[16px] py-[16px] text-[16px] absolute top-0 left-0 bottom-0 group-focus-within:text-gray-100 group-focus-within:-top-[50%] group-focus-within:text-[14px] group-focus-within:z-30 z-10"
        >
          권한
        </label>
        <select
          className="w-full bg-color3 text-white rounded-lg px-[16px] py-[16px] text-[16px] placeholder-[#8d8d8d] z-20 group-focus-within:outline-none"
          value={role}
          onChange={handleRoleChangeClick}
        >
          {rolesQuery.data.map((role) => (
            <option 
              key={role.id} 
              value={role.id}
            >
              {translateRoleNameToKorean(role.name)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default AdminUsersDetailsAccountSettingsRoleChange;