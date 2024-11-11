import { MyPageStoreContext } from "@/app/my-page/layout";
import useClickOutside from "@/hooks/useClickOutside";
import { InquiryType } from "@/models/user.models";
import { extractInquiryTypeNameInKorean } from "@/utils/user.utils";
import { useContext, useRef, useState } from "react";
import { useStore } from "zustand";


interface IUserInquiriesCreateTypeButtonProps {
  type: InquiryType;
}

export default function UserInquiriesCreateTypeButton({ type }: IUserInquiriesCreateTypeButtonProps) {
  const store = useContext(MyPageStoreContext);
  const setInquiryTypeId = useStore(store, (state) => state.updateInquiriesCreateTypeId);

  const displayNameInKorean = extractInquiryTypeNameInKorean(type);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInquiryTypeId(type.id);
  }

  return (
    <button 
      className="px-[32px] py-[12px] rounded-full bg-color3"
      onClick={handleClick}
    >
      {displayNameInKorean}      
    </button>
  )
}