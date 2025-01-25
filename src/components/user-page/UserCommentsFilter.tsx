import { useContext } from "react";
import FilterButton from "../common/FilterButton";
import SearchBox from "../common/SearchBox";
import UserCommentsSortButtonOptionsContainer from "./UserCommentsSortButtonOptionsContainer";
import { UserStoreContext } from "@/stores/users.stores";
import { useStore } from "zustand";


const UserCommentsFilter = () => {
  const store = useContext(UserStoreContext);
  const setCommentsArgumentsModified = useStore(store, (state) => state.setCommentsArgumentsModified);

  return (
    <section className="flex justify-between items-end" aria-label="user-comments-filter">
      <div className="flex gap-[24px]" aria-label="user-comments-filter-buttons">
        <FilterButton name="정렬">
          <UserCommentsSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox 
          pressEnterCallback={() => setCommentsArgumentsModified(true)} 
          aria-label="search-user-comments"
        />
      </div>
    </section>
  );
}

export default UserCommentsFilter;