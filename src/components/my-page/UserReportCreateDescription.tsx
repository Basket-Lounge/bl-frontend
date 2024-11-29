import { UserStoreContext } from '@/stores/users.stores';
import { useContext } from "react";
import { useStore } from "zustand";


const UserReportCreateDescription = () => {
  const store = useContext(UserStoreContext);
  const description = useStore(store, (state) => state.reportCreateDescription);
  const setDescription = useStore(store, (state) => state.updateReportCreateDescription);
  const descriptionError = useStore(store, (state) => state.reportCreateDescriptionError);

  return (
    <div className="flex flex-col items-stretch gap-[16px]">
      {descriptionError && (
        <p className="text-red-500 font-semibold text-[16px]">{descriptionError}</p>
      )}
      <textarea
        placeholder="신고 내용을 입력해주세요."
        className="bg-color3 p-[24px] text-white outline-none grow placeholder:font-semibold text-[16px] h-[750px] resize-none rounded-md"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}

export default UserReportCreateDescription;