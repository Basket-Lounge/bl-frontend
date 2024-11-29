import { TeamStoreContext } from "@/stores/teams.stores";
import { useContext } from "react";
import { useStore } from "zustand";
import FilterButton from "../common/FilterButton";
import SearchBox from "../common/SearchBox";
import TeamPostsSortButtonOptionsContainer from "./TeamPostsSortButtonOptionsContainer";


const TeamPostsFilter = () => {
  const store = useContext(TeamStoreContext);
  const setPostsArgumentsModified = useStore(store, (state) => state.setPostsArgumentsModified);

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <FilterButton name="정렬">
          <TeamPostsSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox pressEnterCallback={() => setPostsArgumentsModified(true)} />
      </div>
    </div>
  );
}

export default TeamPostsFilter;