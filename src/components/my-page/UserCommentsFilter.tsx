import { useContext } from "react";
import FilterButton from "../common/FilterButton";
import SearchBox from "../common/SearchBox";
import UserCommentsSortButtonOptionsContainer from "./UserCommentsSortButtonOptionsContainer";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useStore } from "zustand";


const UserCommentsFilter = () => {
  const store = useContext(MyPageStoreContext);
  const setCommentArgumentsModified = useStore(store, (state) => state.setCommentArgumentsModified);

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <FilterButton name="정렬">
          <UserCommentsSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox pressEnterCallback={() => setCommentArgumentsModified(true)} />
      </div>
    </div>
  );
}

export default UserCommentsFilter;