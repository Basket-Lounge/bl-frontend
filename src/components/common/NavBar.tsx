'use client'

import useTokenRefresh from "@/hooks/useTokenRefresh";
import { useRouter, useSearchParams } from "next/navigation";
import Team from "./navbar/Team";
import UserMenu from "./navbar/UserMenu";


export default function NavBar() {
  const router = useRouter();

  useTokenRefresh();

  const handleHomeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/");
  }

  return (
    <div className="bg-color1 w-full py-[20px]">
      <div className="flex items-center mobile-1:w-[360px] mobile-2:w-[480px] tablet:w-[768px] desktop-1:w-[1024px] desktop-2:w-[1200px] mx-auto">
        <div className="text-white text-[20px] font-medium w-1/3">
          <button
            onClick={handleHomeClick}
          >
            Basket Lounge
          </button>
        </div>
        <div className="flex items-center justify-center gap-[32px] w-1/3">
          <Team />
          <a href="#" className="font-medium">선수</a>
          <a href="#" className="font-medium">스케쥴</a>
        </div>
        <div className="flex justify-end w-1/3">
          <UserMenu />
        </div>
      </div>
    </div>
  )
}