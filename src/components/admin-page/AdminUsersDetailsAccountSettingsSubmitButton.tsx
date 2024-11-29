'use client'

import { updateUser } from "@/api/admin.api";
import { UserManagementStoreContext } from '@/stores/admin.stores';
import { useAuthStore } from "@/stores/auth.stores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { useStore } from "zustand";


const AdminUsersDetailsAccountSettingsSubmitButton = () => {
  const { userId } = useParams();
  const queryClient = useQueryClient();

  const store = useContext(UserManagementStoreContext);
  const introduction = useStore(store, (state) => state.introduction);
  const prevIntroduction = useStore(store, (state) => state.prevIntroduction);

  const isProfileVisible = useStore(store, (state) => state.isProfileVisible);
  const prevIsProfileVisible = useStore(store, (state) => state.prevIsProfileVisible);

  const isChatBlocked = useStore(store, (state) => state.isChatBlocked);
  const prevIsChatBlocked = useStore(store, (state) => state.prevIsChatBlocked);

  const username = useStore(store, (state) => state.username);
  const prevUsername = useStore(store, (state) => state.prevUsername);

  const role = useStore(store, (state) => state.role);
  const prevRole = useStore(store, (state) => state.prevRole);

  const {
    setUsername
  } = useStore(useAuthStore);

  const userMutation = useMutation({
    mutationFn: (data: {
      introduction: string, 
      is_profile_visible: boolean, 
      chat_blocked: boolean, 
      username: string,
      role: number
    }) => {
      return updateUser(parseInt(userId as string), data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['admin', 'users', 'details', userId as string], 
        data
      );
      queryClient.invalidateQueries({
        queryKey: ["admin", "my-info"],
        exact: true,
      });
      setUsername(data.username);
    }
  });

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    userMutation.mutate({
      introduction, 
      is_profile_visible: isProfileVisible, 
      chat_blocked: isChatBlocked,
      username,
      role
    });
  }

  return (
    <div className="flex flex-col gap-[16px] items-stretch">
      {userMutation.isPending && <p className="text-white text-[16px]">저장 중...</p>}
      {userMutation.isError && <p className="text-white text-[16px]">저장 중 오류가 발생했습니다.</p>}
      {(!userMutation.isPending && (
        introduction !== prevIntroduction ||
        isProfileVisible !== prevIsProfileVisible ||
        isChatBlocked !== prevIsChatBlocked ||
        username !== prevUsername ||
        role !== prevRole
      )) && (
        <button 
          className="text-white bg-color1 py-[12px] px-[32px] rounded-full w-fit"
          onClick={handleSaveClick}
        >
          저장
        </button>
      )}
    </div>
  );
}

export default AdminUsersDetailsAccountSettingsSubmitButton;