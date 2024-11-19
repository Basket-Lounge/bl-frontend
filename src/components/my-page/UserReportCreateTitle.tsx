import { UserStoreContext } from "@/app/users/[userId]/layout";
import { useContext } from "react";
import { useStore } from "zustand";


const UserReportCreateTitle = () => {
  const store = useContext(UserStoreContext);
  const title = useStore(store, (state) => state.reportCreateTitle);
  const setTitle = useStore(store, (state) => state.updateReportCreateTitle);
  const titleError = useStore(store, (state) => state.reportCreateTitleError);

  return (
    <div className="flex flex-col items-stretch gap-[16px]">
      {titleError && (
        <p className="text-red-500 font-semibold text-[16px]">{titleError}</p>
      )}
      <input
        type="text"
        placeholder="제목을 입력하세요"
        className="bg-transparent text-white font-semibold outline-none grow placeholder:font-semibold text-[24px]"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}

export default UserReportCreateTitle;