import { useContext } from "react";
import FilterButton from "../common/FilterButton";
import SearchBox from "../common/SearchBox";
import AdminReportsSortButtonOptionsContainer from "./AdminReportsSortButtonOptionsContainer";
import AdminReportsStatusFilterButtonOptionsContainer from "./AdminReportsStatusFilterButtonOptionsContainer";
import { AdminPageStoreContext } from "@/stores/admin.stores";
import { useStore } from "zustand";


const AdminReportsFilter = () => {
  const store = useContext(AdminPageStoreContext);
  const setReportsArgumentsModified = useStore(store, (state) => state.setReportsArgumentsModified);

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <FilterButton name="상태 필터">
          <AdminReportsStatusFilterButtonOptionsContainer />
        </FilterButton>
        <FilterButton name="정렬">
          <AdminReportsSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox pressEnterCallback={() => setReportsArgumentsModified(true)} />
      </div>
    </div>
  );
}

export default AdminReportsFilter;