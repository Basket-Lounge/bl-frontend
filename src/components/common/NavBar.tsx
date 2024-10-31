'use client'

import useTokenRefresh from "@/hooks/useTokenRefresh";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { useStore } from "zustand";
import { pageSizeControllerStoreContext } from "./PageSizeController";
import Team from "./navbar/Team";
import UserMenu from "./navbar/UserMenu";


export default function NavBar() {
  const store = useContext(pageSizeControllerStoreContext);
  const pageWidth = useStore(store, (state) => state.pageWidth);
  const searchParams = useSearchParams();

  useTokenRefresh();

  // Redirect code handling logic for various scenarios
  useEffect(() => {
    if (searchParams.get("redirect-code")) {
      const redirectCode = searchParams.get("redirect-code");
    }
  }, [searchParams]);

  return (
    <div className="bg-color1 w-full py-[20px]">
      <div className="flex items-center" style={{ width: `${pageWidth}px`, margin: 'auto' }}>
        <h2 className="text-white text-[20px] font-medium w-1/3">Basket Lounge</h2>
        <div className="flex items-center justify-center gap-[32px] w-1/3">
          <Link href="/">
            홈
          </Link>
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