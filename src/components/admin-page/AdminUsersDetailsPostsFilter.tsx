import AdminUsersDetailsPostsSearchBox from "./AdminUsersDetailsPostsSearchBox copy";
import AdminFilterButton from "./AdminFilterButton";
import AdminUsersDetailsPostsStatusFilterButtonOptionsContainer from "./AdminUsersDetailsPostsStatusFilterButtonOptionsContainer";
import AdminUsersDetailsPostsSortButtonOptionsContainer from "./AdminUsersDetailsPostsSortButtonOptionsContainer";
import AdminUsersDetailsPostsTeamsFilterButtonOptionsContainer from "./AdminUsersDetailsPostsTeamsFilterButtonOptionsContainer";

const AdminUsersDetailsPostsFilter = () => {
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
        <AdminUsersDetailsPostsSearchBox />
      </div>
    </div>
  );
}

export default AdminUsersDetailsPostsFilter;