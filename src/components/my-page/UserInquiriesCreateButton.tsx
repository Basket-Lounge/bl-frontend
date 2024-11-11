'use client'

import { useRouter } from "next/navigation";


const UserInquiriesCreateButton = () => {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/my-page/inquiries/create`);
  }

  return (
    <button 
      className="bg-color1 rounded-full py-[12px] px-[20px] flex items-center"
      onClick={handleClick}
    >
      문의하기
    </button>
  )
}

export default UserInquiriesCreateButton;