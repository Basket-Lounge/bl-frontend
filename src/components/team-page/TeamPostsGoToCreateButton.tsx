'use client'

import { usePathname, useRouter } from "next/navigation";


const TeamPostsGoToCreateButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(pathname + '/create');
  }

  return (
    <button 
      className="bg-color1 rounded-full py-[12px] px-[20px] flex items-center"
      onClick={handleClick}
    >
      글쓰기
    </button>
  )
}

export default TeamPostsGoToCreateButton;