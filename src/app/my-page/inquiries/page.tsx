'use client'

import { getMyInquiries } from "@/api/user.api";
import SpinnerLoading from "@/components/common/SpinnerLoading";
import UserInquiriesContainer from "@/components/my-page/UserInquiriesContainer";
import UserInquiriesFilter from "@/components/my-page/UserInquiriesFilter";
import UserInquiriesLiveChat from "@/components/my-page/UserInquiriesLiveChat";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";


const InquiriesPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || '1');
  const inquiry = searchParams.get("inquiry") || '';

  const userInquiriesQuery = useSuspenseQuery({
    queryKey: ['my-page', "inquiries", "pagination", page],
    queryFn: async () => {
      return await getMyInquiries(page);
    },
    staleTime: Infinity
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
    router.push(pathname + `?${createQueryString('page', newPage.toString())}`);
  }

  const divClassName = inquiry ? 
    "flex flex-col-reverse items-stretch lg:grid grid-cols-2 lg:items-start gap-[32px]" : 
    "flex flex-col items-stretch gap-[32px]"

  if (userInquiriesQuery.isLoading) { 
    return (
      <div className="flex flex-col gap-[24px] items-stretch">
        <UserInquiriesFilter />
        <SpinnerLoading />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <UserInquiriesFilter />
      <div className={divClassName}>
        <UserInquiriesContainer inquiries={userInquiriesQuery.data.results} />
        {inquiry ? (
          <Suspense fallback={<SpinnerLoading />}>
            <UserInquiriesLiveChat inquiryId={inquiry} />
          </Suspense>
        ) : null}
      </div>
      <TeamPostsPagination 
        currentPageNumber={page}
        previousCallback={
          userInquiriesQuery.data.previous ? () => handlePageChange(page - 1) : undefined
        }
        nextCallback={
          userInquiriesQuery.data.next ? () => handlePageChange(page + 1) : undefined
        }
      />
    </div>
  );
}

export default InquiriesPage;