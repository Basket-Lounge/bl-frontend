'use client'

import useTokenRefresh from "@/hooks/useTokenRefresh";
import { useRouter } from "next/navigation";
import Team from "./navbar/Team";
import UserMenu from "./navbar/UserMenu";


export default function NavBar() {
  const router = useRouter();

  useTokenRefresh();

  const handleHomeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/");
  }

  const handleScheduleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/games");
  }

  return (
    <div className="bg-color1 w-full py-[20px]">
      <div className="flex items-center sm:w-[360px] md:w-[480px] lg:w-[768px] xl:w-[1024px] 2xl:w-[1200px] mx-auto">
        <div className="text-white text-[16px] lg:text-[20px] font-medium w-1/3">
          <button
            onClick={handleHomeClick}
          >
            Basket Lounge
          </button>
        </div>
        <div className="flex items-center justify-center gap-[32px] w-1/3">
          <Team />
          <button 
            onClick={handleScheduleClick}
            className="font-medium"
          >
            스케쥴
          </button>
        </div>
        <div className="flex justify-end w-1/3">
          <UserMenu />
        </div>
      </div>
    </div>
  )
}