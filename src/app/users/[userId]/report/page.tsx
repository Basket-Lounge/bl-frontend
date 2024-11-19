'use client'

import { getReportTypes } from "@/api/user.api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UserStoreContext } from "../layout";
import { useContext } from "react";
import { useStore } from "zustand";
import UserReportCreateTitle from "@/components/my-page/UserReportCreateTitle";
import UserReportCreateTypes from "@/components/my-page/UserReportCreateType";
import UserReportCreateDescription from "@/components/my-page/UserReportCreateDescription";
import UserReportCreateSubmitButton from "@/components/my-page/UserReportCreateSubmitButton";
import { useRouter } from "next/navigation";


const ReportPage = () => {
  const router = useRouter();
  const inquiryTypesQuery = useSuspenseQuery({
    queryKey: ["report", "types"],
    queryFn: async () => {
      return await getReportTypes();
    }
  });

  const store = useContext(UserStoreContext);
  const reportTypeId = useStore(store, (state) => state.reportCreateTypeId);

  const handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  }

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <button 
        className="text-white bg-color1 py-[12px] px-[32px] rounded-full w-fit"
        onClick={handleBackButtonClick}
      >
        👈 뒤로가기
      </button>
      <UserReportCreateTitle />
      <UserReportCreateTypes types={inquiryTypesQuery.data} />
      {reportTypeId && (
        <div className="flex flex-col gap-[24px] items-stretch">
          <UserReportCreateDescription />
          <UserReportCreateSubmitButton />
        </div>
      )}
    </div>
  )
}

export default ReportPage;