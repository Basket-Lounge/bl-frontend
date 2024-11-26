'use client'

import { getAllRoles, getAllUsers } from "@/api/admin.api";
import AdminUsersContainer from "@/components/admin-page/AdminUsersContainer";
import AdminUsersFilter from "@/components/admin-page/AdminUsersFilter";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import { AdminPageStoreContext } from "../layout";
import { useStore } from "zustand";


const AdminUserManagementPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = isNaN(parseInt(searchParams.get('page') || '1')) ? 
    1 : 
    parseInt(searchParams.get('page') || '1');

  const roles = searchParams.get('roles') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';

  const store = useContext(AdminPageStoreContext);
  const userArgumentsModified = useStore(store, (state) => state.userArgumentsModified);
  const setUserArgumentsModified = useStore(store, (state) => state.setUserArgumentsModified);

  useSuspenseQuery({
    queryKey: ['admin', 'users', 'roles'],
    queryFn: async () => {
      return await getAllRoles();
    }
  });

  const usersQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', 'pagination', page],
    queryFn: async () => {
      return await getAllUsers(page, roles, sort, search);
    }
  });

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  }, [searchParams]);

  const handlePageChange = useCallback((newPage: number) => {
    setUserArgumentsModified(true);
    router.push(pathname + "?" + createQueryString('page', newPage.toString()));  
  }, [pathname, createQueryString]);

  useEffect(() => {
    if (userArgumentsModified) {
      setUserArgumentsModified(false);
      usersQuery.refetch();
    }

  }, [roles, search, sort, page]);

  if (usersQuery.isRefetching) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <AdminUsersFilter />
      <AdminUsersContainer users={usersQuery.data.results} />
      <TeamPostsPagination
        currentPageNumber={page}
        previousCallback={
          usersQuery.data.previous ? () => handlePageChange(page - 1) : undefined
        }
        nextCallback={
          usersQuery.data.next ? () => handlePageChange(page + 1) : undefined
        }
      />
    </div>
  )
}

export default AdminUserManagementPage;