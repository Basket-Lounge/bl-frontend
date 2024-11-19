import AdminInquiriesTypeFilterButton from "./AdminInquiriesTypeFilterButton";
import AdminInquiriesSearchBox from "./AdminInquiriesSearchBox";


const AdminInquiriesFilter = () => {
  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <AdminInquiriesTypeFilterButton name="상태 필터" />
      </div>
      <div className="flex gap-[24px] items-center">
        <AdminInquiriesSearchBox />
      </div>
    </div>
  );
}

export default AdminInquiriesFilter;