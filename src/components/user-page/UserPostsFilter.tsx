import { useContext } from "react";
import FilterButton from "../common/FilterButton";
import SearchBox from "../common/SearchBox";
import UserPostsSortButtonOptionsContainer from "./UserPostsSortButtonOptionsContainer";
import { UserStoreContext } from "@/stores/users.stores";
import { useStore } from "zustand";


const UserPostsFilter = () => {
  const store = useContext(UserStoreContext);
  const setPostsArgumentsModified = useStore(store, (state) => state.setPostsArgumentsModified);

  return (
    <section className="flex justify-between items-end" aria-label="user-posts-filter">
      <div className="flex gap-[24px]" aria-label="user-posts-filter-buttons">
        <FilterButton name="정렬">
          <UserPostsSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox 
          pressEnterCallback={() => setPostsArgumentsModified(true)} 
          aria-label="search-user-posts"
        />
      </div>
    </section>
  );
}

export default UserPostsFilter;