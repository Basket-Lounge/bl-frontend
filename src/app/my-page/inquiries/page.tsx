'use client'

import { getMyInquiries } from "@/api/user.api";
import UserInquiriesContainer from "@/components/my-page/UserInquiriesContainer";
import UserInquiriesFilter from "@/components/my-page/UserInquiriesFilter";
import UserInquiriesLiveChat from "@/components/my-page/UserInquiriesLiveChat";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";


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
  });

  const handlePageChange = (newPage: number) => {
    router.push(pathname + `?page=${newPage}`);
  }

  const divClassName = inquiry ? 
    "desktop-1:grid grid-cols-2 item-start gap-[32px]" : "flex flex-col items-stretch gap-[32px]"

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <UserInquiriesFilter />
      <div className={divClassName}>
        <UserInquiriesContainer inquiries={userInquiriesQuery.data.results} />
        {inquiry ? (
          <Suspense fallback={<div>Loading...</div>}>
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