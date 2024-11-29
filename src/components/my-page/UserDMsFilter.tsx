import { MyPageStoreContext } from "@/stores/myPage.stores";
import FilterButton from "../common/FilterButton";
import SearchBox from "../common/SearchBox";
import UserDMsSortButtonOptionsContainer from "./UserDMsSortButtonOptionsContainer";
import { useContext } from "react";
import { useStore } from "zustand";


const UserDMsFilter = () => {
  const store = useContext(MyPageStoreContext);
  const setChatArgumentsModified = useStore(store, (state) => state.setChatArgumentsModified);

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <p className="text-[20px] font-bold">개인 채팅</p>
        <FilterButton name="정렬">
          <UserDMsSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox pressEnterCallback={() => setChatArgumentsModified(true)} />
      </div>
    </div>
  );
}

export default UserDMsFilter;