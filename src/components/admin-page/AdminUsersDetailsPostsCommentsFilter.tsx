import AdminFilterButton from "./AdminFilterButton";
import AdminUsersDetailsPostsCommentsStatusFilterButtonOptionsContainer from "./AdminUsersDetailsPostsCommentsStatusFilterButtonOptionsContainer";
import AdminUsersDetailsPostsCommentsSortButtonOptionsContainer from "./AdminUsersDetailsPostsCommentsSortButtonOptionsContainer";
import AdminUsersDetailsPostsCommentsTeamsFilterButtonOptionsContainer from "./AdminUsersDetailsPostsCommentsTeamsFilterButtonOptionsContainer";
import AdminUsersSearchBox from "./AdminUsersSearchBox";
import { useContext } from "react";
import { useStore } from "zustand";
import { AdminPageStoreContext } from "@/stores/admin.stores";

const AdminUsersDetailsPostsCommentsFilter = () => {
  const store = useContext(AdminPageStoreContext);
  const setCommentArgumentsModified = useStore(store, (state) => state.setCommentArgumentsModified);

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <AdminFilterButton name="상태 필터">
          <AdminUsersDetailsPostsCommentsStatusFilterButtonOptionsContainer />
        </AdminFilterButton>
        <AdminFilterButton name="팀 필터">
          <AdminUsersDetailsPostsCommentsTeamsFilterButtonOptionsContainer />
        </AdminFilterButton>
        <AdminFilterButton name="정렬">
          <AdminUsersDetailsPostsCommentsSortButtonOptionsContainer />
        </AdminFilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <AdminUsersSearchBox
          pressEnterCallback={() => setCommentArgumentsModified(true)}
        />
      </div>
    </div>
  );
}

export default AdminUsersDetailsPostsCommentsFilter;