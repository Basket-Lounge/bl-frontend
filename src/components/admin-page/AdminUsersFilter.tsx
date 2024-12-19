import { AdminPageStoreContext } from "@/stores/admin.stores";
import { useContext } from "react";
import { useStore } from "zustand";
import SearchBox from "../common/SearchBox";
import FilterButton from "../common/FilterButton";
import AdminUsersTypeFilterButtonOptionsContainer from "./AdminUsersTypeFilterButtonOptionsContainer";
import AdminUsersSortButtonOptionsContainer from "./AdminUsersSortButtonOptionsContainer";


const AdminUsersFilter = () => {
  const store = useContext(AdminPageStoreContext);
  const setUserArgumentsModified = useStore(store, (state) => state.setUserArgumentsModified);

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <FilterButton name="유형 필터">
          <AdminUsersTypeFilterButtonOptionsContainer />
        </FilterButton>
        <FilterButton name="정렬">
          <AdminUsersSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <SearchBox pressEnterCallback={() => setUserArgumentsModified(true)} />
      </div>
    </div>
  );
}

export default AdminUsersFilter;