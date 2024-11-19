'use client'

import { useAuthStore } from "@/stores/auth.stores";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "zustand";


export default function UserHeaderReportButton() {
  const router = useRouter();
  const { userId } = useParams();
  const {
    isAuthenticated
  } = useStore(useAuthStore);


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    
    router.push(`/users/${userId}/report`);
  }

  return (
    <button 
      className="bg-color3 rounded-lg text-[16px] p-[12px] font-medium flex gap-[12px] items-center"
      onClick={handleClick}
      disabled={!isAuthenticated}
    >
      <Image
        src={"/icons/report_24dp_FFFFFF.svg"}
        alt="chat"
        width={24}
        height={24}
      />
      <span>신고하기</span>
    </button>
  )
}