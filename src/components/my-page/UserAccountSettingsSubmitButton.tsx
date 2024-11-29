'use client'

import { updateUser } from "@/api/user.api";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useStore } from "zustand";


const UserAccountSettingsSubmitButton = () => {
  const queryClient = useQueryClient();

  const store = useContext(MyPageStoreContext);
  const introduction = useStore(store, (state) => state.introduction);
  const prevIntroduction = useStore(store, (state) => state.prevIntroduction);

  const isProfileVisible = useStore(store, (state) => state.isProfileVisible);
  const prevIsProfileVisible = useStore(store, (state) => state.prevIsProfileVisible);

  const isChatBlocked = useStore(store, (state) => state.isChatBlocked);
  const prevIsChatBlocked = useStore(store, (state) => state.prevIsChatBlocked);

  const username = useStore(store, (state) => state.username);
  const prevUsername = useStore(store, (state) => state.prevUsername);

  const userMutation = useMutation({
    mutationFn: (data: {
      introduction: string, 
      is_profile_visible: boolean, 
      chat_blocked: boolean, 
      username: string,
    }) => {
      return updateUser(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['my-page', 'user-info'],
        data
      );
    }
  });

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    userMutation.mutate({
      introduction, 
      is_profile_visible: isProfileVisible, 
      chat_blocked: isChatBlocked,
      username,
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
        username !== prevUsername
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

export default UserAccountSettingsSubmitButton;