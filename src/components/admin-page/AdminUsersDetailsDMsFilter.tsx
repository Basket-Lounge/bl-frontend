import { AdminPageStoreContext } from "@/stores/admin.stores";
import AdminFilterButton from "./AdminFilterButton";
import AdminUsersDetailsDMsSortButtonOptionsContainer from "./AdminUsersDetailsDMsSortButtonOptionsContainer";
import { useContext } from "react";
import { useStore } from "zustand";
import SearchBox from "../common/SearchBox";


const AdminUsersDetailsDMsFilter = () => {
  const store = useContext(AdminPageStoreContext);
  const setChatArgumentsModified = useStore(store, (state) => state.setChatArgumentsModified);

  return (
    <section className="flex justify-between items-end" aria-label="admin-users-details-dms-filter">
      <div className="flex gap-[24px]" aria-label="admin-users-details-dms-filter-buttons">
        <AdminFilterButton name="정렬">
          <AdminUsersDetailsDMsSortButtonOptionsContainer />
        </AdminFilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox 
          pressEnterCallback={() => setChatArgumentsModified(true)} 
          aria-label="search-users-dms"
        />
      </div>
    </section>
  );
}

export default AdminUsersDetailsDMsFilter;