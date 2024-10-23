import { updateUserIntroduction } from "@/api/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";


const UserAccountSettingsTeamIntroduction = ({introduction}: {introduction: string}) => {
  const [initialIntroduction, setInitialIntroduction] = useState<string>(introduction);
  const [newIntroduction, setNewIntroduction] = useState<string>(introduction);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (introduction: string) => {
      return updateUserIntroduction(introduction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["my-page", "user-info"],});
      setInitialIntroduction(newIntroduction);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewIntroduction(e.target.value);
  };

  const handleClick = () => {
    mutation.mutate(newIntroduction);
  };

  return (
    <div className="w-1/2">
      <label className="text-white text-[20px] font-bold block">자기 소개</label>
      {initialIntroduction && <p className="mt-[16px] text-[16px]">{initialIntroduction}</p>}
      <textarea 
        id="message" 
        rows={4}
        className="mt-[16px] block p-2.5 w-full text-[16px] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" 
        placeholder="Write your thoughts here..."
        onChange={handleChange}
        value={newIntroduction}
      >
      </textarea>
      {mutation.isPending && <p className="mt-[16px] text-white">저장 중...</p>}
      {mutation.isError && <p className="mt-[16px] text-white">저장 중 오류가 발생했습니다.</p>}
      {mutation.isSuccess && <p className="mt-[16px] text-white">저장되었습니다.</p>}
      {(
        !mutation.isPending && 
        initialIntroduction !== newIntroduction
      ) && (
      <button 
        className="mt-[16px] bg-color1 text-white rounded-full px-[32px] py-[8px]"
        onClick={() => handleClick()}
      >
        저장
      </button>
      )}
    </div>
  );
}

export default UserAccountSettingsTeamIntroduction;