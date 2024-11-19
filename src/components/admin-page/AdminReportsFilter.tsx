import AdminReportsSearchBox from "./AdminReportsSearchBox";
import AdminReportsTypeFilterButton from "./AdminReportsTypeFilterButton";


const AdminReportsFilter = () => {
  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <AdminReportsTypeFilterButton name="상태 필터" />
      </div>
      <div className="flex gap-[24px] items-center">
        <AdminReportsSearchBox />
      </div>
    </div>
  );
}

export default AdminReportsFilter;