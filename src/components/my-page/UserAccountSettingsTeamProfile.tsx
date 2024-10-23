import React, { useEffect, useState } from "react";
import Toggle from "../common/toggle/Toggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfileVisibility } from "@/api/user.api";


interface IUserAccountSettingsTeamProfileProps {
  isChecked: boolean;
}

const UserAccountSettingsTeamProfile = ({isChecked}: IUserAccountSettingsTeamProfileProps) => {
  const [initialIsProfileVisible, setInitialIsProfileVisible] = useState<boolean>(isChecked);
  const [isProfileVisible, setIsProfileVisible] = useState<boolean>(isChecked);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (isProfileVisible: boolean) => {
      return updateUserProfileVisibility(isProfileVisible);
    },
    onSuccess: () => {
      setInitialIsProfileVisible(isProfileVisible);
      queryClient.invalidateQueries({queryKey: ["my-page", "user-info"],});
    }
  });

  const handleProfileVisibility = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    setIsProfileVisible(value => !value);
  }

  useEffect(() => {
    console.log('useEffect');
    console.log(isProfileVisible);
  }, [isProfileVisible]);

  return (
    <div className="w-1/2">
      <h3 className="text-white text-[20px] font-bold">계정 설정</h3>
      <div className="mt-[16px] w-full">
        <Toggle isChecked={isProfileVisible} handleClick={handleProfileVisibility} />
      </div>
      {mutation.isPending && <p className="mt-[16px] text-white">저장 중...</p>}
      {mutation.isError && <p className="mt-[16px] text-white">저장 중 오류가 발생했습니다.</p>}
      {mutation.isSuccess && <p className="mt-[16px] text-white">저장되었습니다.</p>}
      {(
        !mutation.isPending && 
        initialIsProfileVisible !== isProfileVisible
      ) && (
      <button 
        className="mt-[16px] bg-color1 text-white rounded-full px-[32px] py-[8px]"
        onClick={() => mutation.mutate(isProfileVisible)}
      >
        저장
      </button>
      )}
    </div>
  );
}

export default UserAccountSettingsTeamProfile;