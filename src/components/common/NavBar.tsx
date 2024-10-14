'use client'

import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import { useRef, useState } from "react";


export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useClickOutside(menuButtonRef, setIsMenuOpen);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="bg-color1 w-full py-[20px] px-[256px] flex items-center">
      <h2 className="text-white text-[20px] font-medium w-1/3">Basket Lounge</h2>
      <div className="flex items-center justify-center gap-[32px] w-1/3">
        <a href="#" className="font-medium text-[16px]">팀</a>
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
            <a href="#" className="block text-white font-medium text-[16px]">구글 로그인</a>
          </div>
          )}
        </button>
      </div>
    </div>
  )
}