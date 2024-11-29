import { MyPageStoreContext } from "@/stores/myPage.stores";
import FilterButton from "../common/FilterButton";
import SearchBox from "../common/SearchBox";
import UserPostsSortButtonOptionsContainer from "./UserPostsSortButtonOptionsContainer";
import { useContext } from "react";
import { useStore } from "zustand";


const UserPostsFilter = () => {
  const store = useContext(MyPageStoreContext);
  const setPostArgumentsModified = useStore(store, (state) => state.setPostArgumentsModified);

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <FilterButton name="정렬">
          <UserPostsSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox pressEnterCallback={() => setPostArgumentsModified(true)} />
      </div>
    </div>
  );
}

export default UserPostsFilter;