import { MyPageStoreContext } from "@/app/my-page/layout";
import useClickOutside from "@/hooks/useClickOutside";
import { InquiryType } from "@/models/user.models";
import { useContext, useRef, useState } from "react";
import { useStore } from "zustand";
import UserInquiriesCreateTypeButton from "./UserInquiriesCreateTypeButton";
import { extractInquiryTypeNameInKorean } from "@/utils/user.utils";


interface IUserInquiriesCreateTypesProps {
  types: InquiryType[];
}

export default function UserInquiriesCreateTypes({ types }: IUserInquiriesCreateTypesProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useClickOutside(elementRef, setIsMenuOpen);

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  }

  const store = useContext(MyPageStoreContext);
  const inquiryTypeId = useStore(store, (state) => state.inquiriesCreateTypeId);
  const setInquiryTypeId = useStore(store, (state) => state.updateInquiriesCreateTypeId);

  const inquiry = types.find((type) => type.id === inquiryTypeId);
  let inquiryTypeNameInKorean;
  if (inquiry) {
    inquiryTypeNameInKorean = extractInquiryTypeNameInKorean(inquiry);
  } else {
    inquiryTypeNameInKorean = "";
  }

  return (
    <div 
      ref={elementRef}
      className="flex flex-col items-stretch gap-[16px]"
    >
      <button 
        className="inline-flex w-fit justify-center rounded-full bg-color1 px-[32px] py-[12px] text-[16px] font-medium text-white shadow-sm"
        onClick={handleMenuClick}
      >
        {inquiryTypeId ? 
          inquiryTypeNameInKorean :
          "이것을 누르고 문의하려는 이유를 선택해주세요"
        }
      </button>
      {isMenuOpen && (
        <div className="flex gap-[16px] flex-wrap">
          {types.map((type) => (
            <UserInquiriesCreateTypeButton
              key={type.id}
              type={type}
            />
          ))}
        </div>
      )}
    </div>
  )
}