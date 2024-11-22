import AdminFilterButton from "./AdminFilterButton";
import AdminUsersDetailsPostsStatusFilterButtonOptionsContainer from "./AdminUsersDetailsPostsStatusFilterButtonOptionsContainer";
import AdminUsersDetailsPostsSortButtonOptionsContainer from "./AdminUsersDetailsPostsSortButtonOptionsContainer";
import AdminUsersDetailsPostsTeamsFilterButtonOptionsContainer from "./AdminUsersDetailsPostsTeamsFilterButtonOptionsContainer";
import AdminUsersSearchBox from "./AdminUsersSearchBox";
import { AdminPageStoreContext } from "@/app/admin/layout";
import { useContext } from "react";
import { useStore } from "zustand";

const AdminUsersDetailsPostsFilter = () => {
  const store = useContext(AdminPageStoreContext);
  const setPostsArgumentsModified = useStore(store, (state) => state.setPostsArgumentsModified);

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <AdminFilterButton name="상태 필터">
          <AdminUsersDetailsPostsStatusFilterButtonOptionsContainer />
        </AdminFilterButton>
        <AdminFilterButton name="팀 필터">
          <AdminUsersDetailsPostsTeamsFilterButtonOptionsContainer />
        </AdminFilterButton>
        <AdminFilterButton name="정렬">
          <AdminUsersDetailsPostsSortButtonOptionsContainer />
        </AdminFilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <AdminUsersSearchBox pressEnterCallback={() => setPostsArgumentsModified(true)} />
      </div>
    </div>
  );
}

export default AdminUsersDetailsPostsFilter;