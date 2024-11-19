import AdminUsersSearchBox from "./AdminUsersSearchBox";
import AdminUsersSortButton from "./AdminUsersSortButton";
import AdminUsersTypeFilterButton from "./AdminUsersTypeFilterButton";


const AdminUsersFilter = () => {
  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <AdminUsersTypeFilterButton name="유형 필터" />
        <AdminUsersSortButton name="정렬" />
      </div>
      <div className="flex gap-[24px] items-center">
        <AdminUsersSearchBox />
      </div>
    </div>
  );
}

export default AdminUsersFilter;