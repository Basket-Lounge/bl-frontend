import AdminFilterButton from "./AdminFilterButton";
import AdminUsersDetailsPostsCommentsStatusFilterButtonOptionsContainer from "./AdminUsersDetailsPostsCommentsStatusFilterButtonOptionsContainer";
import AdminUsersDetailsPostsCommentsSortButtonOptionsContainer from "./AdminUsersDetailsPostsCommentsSortButtonOptionsContainer";
import AdminUsersDetailsPostsCommentsTeamsFilterButtonOptionsContainer from "./AdminUsersDetailsPostsCommentsTeamsFilterButtonOptionsContainer";
import { useContext } from "react";
import { useStore } from "zustand";
import { AdminPageStoreContext } from "@/stores/admin.stores";
import SearchBox from "../common/SearchBox";


const AdminUsersDetailsPostsCommentsFilter = () => {
  const store = useContext(AdminPageStoreContext);
  const setCommentArgumentsModified = useStore(store, (state) => state.setCommentArgumentsModified);

  return (
    <section className="flex justify-between items-end" aria-label="admin-users-details-posts-comments-filter">
      <div className="flex gap-[24px]" aria-label="admin-users-details-posts-comments-filter-buttons">
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
        <SearchBox
          pressEnterCallback={() => setCommentArgumentsModified(true)}
          aria-label="search-users-posts-comments"
        />
      </div>
    </section>
  );
}

export default AdminUsersDetailsPostsCommentsFilter;