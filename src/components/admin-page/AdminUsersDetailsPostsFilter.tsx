import AdminUsersDetailsPostsStatusFilterButtonOptionsContainer from "./AdminUsersDetailsPostsStatusFilterButtonOptionsContainer";
import AdminUsersDetailsPostsSortButtonOptionsContainer from "./AdminUsersDetailsPostsSortButtonOptionsContainer";
import AdminUsersDetailsPostsTeamsFilterButtonOptionsContainer from "./AdminUsersDetailsPostsTeamsFilterButtonOptionsContainer";
import AdminUsersSearchBox from "./AdminUsersSearchBox";
import { useContext } from "react";
import { useStore } from "zustand";
import { AdminPageStoreContext } from "@/stores/admin.stores";
import FilterButton from "../common/FilterButton";

const AdminUsersDetailsPostsFilter = () => {
  const store = useContext(AdminPageStoreContext);
  const setPostsArgumentsModified = useStore(store, (state) => state.setPostsArgumentsModified);

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
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
        <AdminUsersSearchBox pressEnterCallback={() => setPostsArgumentsModified(true)} />
      </div>
    </div>
  );
}

export default AdminUsersDetailsPostsFilter;