'use client'

import { getAllReports, getResolvedReports, getUnresolvedReports } from "@/api/admin.api";
import AdminReportsContainer from "@/components/admin-page/AdminReportsContainer";
import AdminReportsDetails from "@/components/admin-page/AdminReportsDetails";
import AdminReportsFilter from "@/components/admin-page/AdminReportsFilter";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { TReportType } from "@/models/admin.models";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef } from "react";


const AdminReportsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialFetch = useRef<boolean>(true);

  const page = parseInt(searchParams.get("page") || '1');
  const filter : TReportType = searchParams.get("filter") as TReportType || 'all';
  const report = searchParams.get("report") || '';

  const queryClient = useQueryClient();
  const adminReportsQuery = useSuspenseQuery({
    queryKey: ['admin', "reports", "pagination", page],
    queryFn: async () => {
      if (filter === 'unsolved') {
        return await getUnresolvedReports(page);
      } else if (filter === 'solved') {
        return await getResolvedReports(page);
      } else {
        return await getAllReports(page);
      }
    },
  });

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
    "desktop-1:grid grid-cols-2 item-start gap-[32px]" : "flex flex-col items-stretch gap-[32px]"

  useEffect(() => {
    if (initialFetch.current) {
      initialFetch.current = false;
      return;
    }

    return () => {
      queryClient.removeQueries({
        queryKey: ['admin', "reports", "pagination"],
      })
    }
  }, []);

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <AdminReportsFilter />
      <div className={divClassName}>
        <AdminReportsContainer
          reports={adminReportsQuery.data.results}
        />
        {report ? (
          <Suspense fallback={<div>Loading...</div>}>
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
    </div>
  );
}

export default AdminReportsPage;