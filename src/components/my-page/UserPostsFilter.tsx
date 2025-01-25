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
    <section className="flex justify-between items-end" aria-label="user-posts-filter">
      <div className="flex gap-[24px]" aria-label="user-posts-filter-buttons">
        <FilterButton name="정렬">
          <UserPostsSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox 
          pressEnterCallback={() => setPostArgumentsModified(true)} 
          aria-label="search-user-posts"
        />
      </div>
    </section>
  );
}

export default UserPostsFilter;