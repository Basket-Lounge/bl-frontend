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
    <section className="flex justify-between items-end" aria-label="user-comments-filter">
      <div className="flex gap-[24px]" aria-label="user-comments-filter-buttons">
        <FilterButton name="정렬">
          <UserCommentsSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox 
          pressEnterCallback={() => setCommentArgumentsModified(true)} 
          aria-label="search-user-comments"
        />
      </div>
    </section>
  );
}

export default UserCommentsFilter;