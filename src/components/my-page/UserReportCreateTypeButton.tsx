import { UserStoreContext } from "@/app/users/[userId]/layout";
import { IReportType } from "@/models/user.models";
import { extractInquiryTypeNameInKorean } from "@/utils/user.utils";
import { useContext } from "react";
import { useStore } from "zustand";


interface IUserReportCreateTypeButtonProps {
  type: IReportType;
}

export default function UserReportCreateTypeButton({ type }: IUserReportCreateTypeButtonProps) {
  const store = useContext(UserStoreContext);
  const setInquiryTypeId = useStore(store, (state) => state.updateReportCreateTypeId);

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