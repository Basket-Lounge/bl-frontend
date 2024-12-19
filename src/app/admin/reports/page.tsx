'use client'

import { getAllReports } from "@/api/admin.api";
import AdminReportsContainer from "@/components/admin-page/AdminReportsContainer";
import AdminReportsDetails from "@/components/admin-page/AdminReportsDetails";
import AdminReportsFilter from "@/components/admin-page/AdminReportsFilter";
import SpinnerLoading from "@/components/common/SpinnerLoading";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { AdminPageStoreContext } from "@/stores/admin.stores";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useContext, useEffect } from "react";
import { useStore } from "zustand";


const AdminReportsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || '1');
  const sort = searchParams.get("sort") || '';
  const resolved = searchParams.get("resolved") || '';
  const search = searchParams.get("search") || '';

  const report = searchParams.get("report") || '';

  const queryClient = useQueryClient();
  const adminReportsQuery = useSuspenseQuery({
    queryKey: ['admin', "reports", "pagination", page],
    queryFn: async () => {
      return await getAllReports(page, {resolved, search, sort});
    },
  });

  const store = useContext(AdminPageStoreContext);
  const reportsArgumentsModified = useStore(store, (state) => state.reportsArgumentsModified);
  const setReportsArgumentsModified = useStore(store, (state) => state.setReportsArgumentsModified);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const handlePageChange = (newPage: number) => {
    router.push(pathname + '?' + createQueryString('page', newPage.toString()));
  }

  const divClassName = report ? 
    "flex flex-col-reverse items-stretch lg:grid grid-cols-2 lg:item-start gap-[32px]" : 
    "flex flex-col items-stretch gap-[32px]"

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['admin', "reports", "pagination"],
      })
    }
  }, []);

  useEffect(() => {
    if (reportsArgumentsModified) {
      setReportsArgumentsModified(false);
      adminReportsQuery.refetch();
    }
  }, [page, resolved, search, sort]);

  if (adminReportsQuery.isRefetching || adminReportsQuery.isLoading) {
    return (
      <div className="flex flex-col gap-[24px] items-stretch">
        <AdminReportsFilter />
        <div className="h-[120px] w-[100%] flex items-center justify-center animate-pulse bg-color3 rounded-md" />
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-[24px] items-stretch">
      <AdminReportsFilter />
      <div className={divClassName}>
        <AdminReportsContainer
          reports={adminReportsQuery.data.results}
        />
        {report ? (
          <Suspense fallback={<SpinnerLoading />}>
            <AdminReportsDetails reportId={report} />
          </Suspense>
        ) : null}
      </div>
      <TeamPostsPagination
        currentPageNumber={page}
        previousCallback={
          adminReportsQuery.data.previous ? () => handlePageChange(page - 1) : undefined
        }
        nextCallback={
          adminReportsQuery.data.next ? () => handlePageChange(page + 1) : undefined
        }
      />
    </section>
  );
}

export default AdminReportsPage;