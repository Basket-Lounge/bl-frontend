'use client'

import { GOOGLE_LOGIN_URL } from "@/constants/socialLogin";
import useClickOutside from "@/hooks/useClickOutside";
import useTokenRefresh from "@/hooks/useTokenRefresh";
import { useAuthStore } from "@/stores/auth.stores";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { useStore } from "zustand";
import { pageSizeControllerStoreContext } from "./PageSizeController";


export default function NavBar() {
  const store = useContext(pageSizeControllerStoreContext);
  const pageWidth = useStore(store, (state) => state.pageWidth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchParams = useSearchParams();

  const {
    isAuthenticated,
    username
  } = useStore(useAuthStore);

  useClickOutside(menuButtonRef, setIsMenuOpen);
  useTokenRefresh();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

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
          <Link href="/teams/1610612750/general-info/">
            홈
          </Link>
          <Link href="/my-page">
            팀
          </Link>
          <a href="#" className="font-medium">선수</a>
          <a href="#" className="font-medium">스케쥴</a>
        </div>
        <div className="flex justify-end w-1/3">
          <button 
            ref={menuButtonRef}
            className="relative"
            onClick={handleMenuClick}
          >
            <Image
              src="/icons/menu_24dp_FFFFFF.svg"
              alt="menu"
              width={28}
              height={20}
            />
            {isMenuOpen && (
            <div
              className={`absolute top-[40px] right-0 w-[300px] bg-color4 rounded-md p-[24px] z-10`}
            >
              {isAuthenticated ? (
              <p>
                Authenticated
              </p>
              ) : (
              <Link href={GOOGLE_LOGIN_URL}>
                로그인
              </Link>
              )}
            </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}