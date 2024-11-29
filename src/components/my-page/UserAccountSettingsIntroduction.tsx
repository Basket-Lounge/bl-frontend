import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useContext } from "react";
import { useStore } from "zustand";


const UserAccountSettingsIntroduction = () => {
  const store = useContext(MyPageStoreContext);
  const introduction = useStore(store, (state) => state.introduction);
  const setIntroduction = useStore(store, (state) => state.setIntroduction);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduction(e.target.value);
  };

  return (
    <div className="tablet:w-1/2">
      <label className="text-white text-[20px] font-bold block">자기 소개</label>
      <textarea 
        id="message" 
        rows={4}
        className="mt-[16px] block p-2.5 w-full text-[16px] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" 
        placeholder="Write your thoughts here..."
        onChange={handleChange}
        value={introduction}
      >
      </textarea>
    </div>
  );
}

export default UserAccountSettingsIntroduction;