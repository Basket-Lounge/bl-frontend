import SearchBox from "../common/SearchBox";
import { AdminPageStoreContext } from "@/stores/admin.stores";
import { useContext } from "react";
import { useStore } from "zustand";
import FilterButton from "../common/FilterButton";
import AdminInquiriesTypeFilterButtonOptionsContainer from "./AdminInquiriesTypeFilterButtonOptionsContainer";


const AdminInquiriesFilter = () => {
  const store = useContext(AdminPageStoreContext);
  const setInquiriesArgumentsModified = useStore(store, (state) => state.setInquiriesArgumentsModified);

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <FilterButton name="상태 필터">
          <AdminInquiriesTypeFilterButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox pressEnterCallback={() => setInquiriesArgumentsModified(true)} />
      </div>
    </div>
  );
}

export default AdminInquiriesFilter;