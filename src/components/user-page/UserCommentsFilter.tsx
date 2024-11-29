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
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <FilterButton name="정렬">
          <UserCommentsSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox pressEnterCallback={() => setCommentsArgumentsModified(true)} />
      </div>
    </div>
  );
}

export default UserCommentsFilter;