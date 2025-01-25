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
    <section className="flex justify-between items-end" aria-label="admin-reports-filter">
      <div className="flex gap-[24px]" aria-label="admin-reports-filter-buttons">
        <FilterButton name="상태 필터">
          <AdminReportsStatusFilterButtonOptionsContainer />
        </FilterButton>
        <FilterButton name="정렬">
          <AdminReportsSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox 
          pressEnterCallback={() => setReportsArgumentsModified(true)} 
          aria-label="search-reports"
        />
      </div>
    </section>
  );
}

export default AdminReportsFilter;