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
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <AdminFilterButton name="정렬">
          <AdminUsersDetailsDMsSortButtonOptionsContainer />
        </AdminFilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox pressEnterCallback={() => setChatArgumentsModified(true)} />
      </div>
    </div>
  );
}

export default AdminUsersDetailsDMsFilter;