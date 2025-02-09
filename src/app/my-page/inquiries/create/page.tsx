'use client'

import { getInquiryTypes } from "@/api/user.api";
import UserInquiriesCreateContent from "@/components/my-page/UserInquiriesCreateContent";
import UserInquiriesCreateTitle from "@/components/my-page/UserInquiriesCreateTitle";
import UserInquiriesCreateTypes from "@/components/my-page/UserInquiriesCreateTypes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useStore } from "zustand";
import UserInquiriesCreateSubmitButton from "@/components/my-page/UserInquiriesCreateSubmitButton";


const CreateInquiryPage = () => {
  const router = useRouter();
  const inquiryTypesQuery = useSuspenseQuery({
    queryKey: ["inquiry", "types"],
    queryFn: async () => {
      return await getInquiryTypes();
    }
  });

  const store = useContext(MyPageStoreContext);
  const inquiryTypeId = useStore(store, (state) => state.inquiriesCreateTypeId);

  const handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  }

  return (
    <section className="flex flex-col gap-[24px] items-stretch" aria-label="create-inquiry">
      <button 
        className="text-white bg-color1 py-[12px] px-[32px] rounded-full w-fit"
        onClick={handleBackButtonClick}
      >
        👈 뒤로가기
      </button>
      <UserInquiriesCreateTitle />
      <UserInquiriesCreateTypes types={inquiryTypesQuery.data} />
      {inquiryTypeId && (
        <div className="flex flex-col gap-[24px] items-stretch">
          <UserInquiriesCreateContent />
          <UserInquiriesCreateSubmitButton />
        </div>
      )}
    </section>
  )
}

export default CreateInquiryPage;