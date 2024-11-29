import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useContext } from "react";
import { useStore } from "zustand";


const UserInquiriesCreateTitle = () => {
  const store = useContext(MyPageStoreContext);
  const title = useStore(store, (state) => state.inquiriesCreateTitle);
  const setTitle = useStore(store, (state) => state.updateInquiriesCreateTitle);
  const titleError = useStore(store, (state) => state.inquiriesCreateTitleError);

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

export default UserInquiriesCreateTitle;