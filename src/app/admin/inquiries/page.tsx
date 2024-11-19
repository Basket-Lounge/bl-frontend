'use client'

import { 
  getAllInquiries, 
  getAssignedInquiries, 
  getMyInquiries, 
  getSolvedInquiries, 
  getUnassignedInquiries, 
  getUnsolvedInquiries 
} from "@/api/admin.api";
import AdminInquiriesContainer from "@/components/admin-page/AdminInquiriesContainer";
import AdminInquiriesFilter from "@/components/admin-page/AdminInquiriesFilter";
import AdminInquiriesLiveChat from "@/components/admin-page/AdminInquiriesLiveChat";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { TInquiryChannelType } from "@/models/admin.models";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef } from "react";


const AdminInquiriesPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialFetch = useRef<boolean>(true);

  const page = parseInt(searchParams.get("page") || '1');
  const filter : TInquiryChannelType = searchParams.get("filter") as TInquiryChannelType || 'all';
  const inquiry = searchParams.get("inquiry") || '';

  const adminInquiriesQuery = useSuspenseQuery({
    queryKey: ['admin', "inquiries", "pagination", page],
    queryFn: async () => {
      if (filter === 'unassigned') {
        return await getUnassignedInquiries(page);
      } else if (filter === 'assigned') {
        return await getAssignedInquiries(page);
      } else if (filter === 'unsolved') {
        return await getUnsolvedInquiries(page);
      } else if (filter === 'solved') {
        return await getSolvedInquiries(page);
      } else if (filter === 'mine') {
        return await getMyInquiries(page);
      } else {
        return await getAllInquiries(page);
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

  const divClassName = inquiry ? 
    "desktop-1:grid grid-cols-2 item-start gap-[32px]" : "flex flex-col items-stretch gap-[32px]"

  useEffect(() => {
    if (initialFetch.current) {
      initialFetch.current = false;
      return;
    }

    adminInquiriesQuery.refetch();
  }, [filter, page]);

  if (adminInquiriesQuery.isRefetching) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <AdminInquiriesFilter />
      <div className={divClassName}>
        <AdminInquiriesContainer 
          inquiries={adminInquiriesQuery.data.results} 
          inquiryType={filter}
        />
        {inquiry ? (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminInquiriesLiveChat inquiryId={inquiry} />
          </Suspense>
        ) : null}
      </div>
      <TeamPostsPagination 
        currentPageNumber={page}
        previousCallback={
          adminInquiriesQuery.data.previous ? () => handlePageChange(page - 1) : undefined
        }
        nextCallback={
          adminInquiriesQuery.data.next ? () => handlePageChange(page + 1) : undefined
        }
      />
    </div>
  );
}

export default AdminInquiriesPage;