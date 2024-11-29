'use client'

import { 
  getInquiries, 
} from "@/api/admin.api";
import AdminInquiriesContainer from "@/components/admin-page/AdminInquiriesContainer";
import AdminInquiriesFilter from "@/components/admin-page/AdminInquiriesFilter";
import AdminInquiriesLiveChat from "@/components/admin-page/AdminInquiriesLiveChat";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { TInquiryChannelType } from "@/models/admin.models";
import { AdminPageStoreContext } from "@/stores/admin.stores";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useContext, useEffect } from "react";
import { useStore } from "zustand";


const AdminInquiriesPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || '1');
  const filter : TInquiryChannelType = searchParams.get("filter") as TInquiryChannelType || 'all';
  const search = searchParams.get('search') || '';
  const inquiry = searchParams.get("inquiry") || '';

  const store = useContext(AdminPageStoreContext);
  const inquiriesArgumentsModified = useStore(store, (state) => state.inquiriesArgumentsModified);
  const setInquiriesArgumentsModified = useStore(store, (state) => state.setInquiriesArgumentsModified);

  const adminInquiriesQuery = useQuery({
    queryKey: ['admin', "inquiries", "pagination", page],
    queryFn: async () => {
      return await getInquiries(page, filter, search);
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
    setInquiriesArgumentsModified(true);
    router.push(pathname + '?' + createQueryString('page', newPage.toString()));
  }

  const divClassName = inquiry ? 
    "desktop-1:grid grid-cols-2 item-start gap-[32px]" : "flex flex-col items-stretch gap-[32px]"

  useEffect(() => {
    if (inquiriesArgumentsModified) {
      setInquiriesArgumentsModified(false);
      adminInquiriesQuery.refetch();
    }
  }, [filter, page, search]);

  if (adminInquiriesQuery.isRefetching || adminInquiriesQuery.isLoading) {
    return (
      <div className="flex flex-col gap-[24px] items-stretch">
        <AdminInquiriesFilter />
        <div className="h-[120px] w-[100%] flex items-center justify-center animate-pulse bg-color3 rounded-md" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <AdminInquiriesFilter />
      <div className={divClassName}>
        <AdminInquiriesContainer 
          inquiries={adminInquiriesQuery.data!.results} 
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
          adminInquiriesQuery.data!.previous ? () => handlePageChange(page - 1) : undefined
        }
        nextCallback={
          adminInquiriesQuery.data!.next ? () => handlePageChange(page + 1) : undefined
        }
      />
    </div>
  );
}

export default AdminInquiriesPage;