import AdminUsersDetailsPostsStatusFilterButtonOptionsContainer from "./AdminUsersDetailsPostsStatusFilterButtonOptionsContainer";
import AdminUsersDetailsPostsSortButtonOptionsContainer from "./AdminUsersDetailsPostsSortButtonOptionsContainer";
import AdminUsersDetailsPostsTeamsFilterButtonOptionsContainer from "./AdminUsersDetailsPostsTeamsFilterButtonOptionsContainer";
import { useContext } from "react";
import { useStore } from "zustand";
import { AdminPageStoreContext } from "@/stores/admin.stores";
import FilterButton from "../common/FilterButton";
import SearchBox from "../common/SearchBox";

const AdminUsersDetailsPostsFilter = () => {
  const store = useContext(AdminPageStoreContext);
  const setPostsArgumentsModified = useStore(store, (state) => state.setPostsArgumentsModified);

  return (
    <section className="flex justify-between items-end" aria-label="admin-users-details-posts-filter">
      <div className="flex gap-[24px]" aria-label="admin-users-details-posts-filter-buttons">
        <FilterButton name="상태 필터">
          <AdminUsersDetailsPostsStatusFilterButtonOptionsContainer />
        </FilterButton>
        <FilterButton name="팀 필터">
          <AdminUsersDetailsPostsTeamsFilterButtonOptionsContainer />
        </FilterButton>
        <FilterButton name="정렬">
          <AdminUsersDetailsPostsSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox 
          pressEnterCallback={() => setPostsArgumentsModified(true)} 
          aria-label="search-users-posts"
        />
      </div>
    </section>
  );
}

export default AdminUsersDetailsPostsFilter;