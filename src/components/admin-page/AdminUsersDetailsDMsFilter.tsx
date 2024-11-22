import { AdminPageStoreContext } from "@/app/admin/layout";
import AdminFilterButton from "./AdminFilterButton";
import AdminUsersDetailsDMsSortButtonOptionsContainer from "./AdminUsersDetailsDMsSortButtonOptionsContainer";
import AdminUsersSearchBox from "./AdminUsersSearchBox";
import { useContext } from "react";
import { useStore } from "zustand";


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
        <AdminUsersSearchBox pressEnterCallback={() => setChatArgumentsModified(true)} />
      </div>
    </div>
  );
}

export default AdminUsersDetailsDMsFilter;