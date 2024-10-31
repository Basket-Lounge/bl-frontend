import { GOOGLE_LOGIN_URL } from "@/constants/socialLogin";
import useClickOutside from "@/hooks/useClickOutside";
import { useAuthStore } from "@/stores/auth.stores";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useStore } from "zustand";


const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useClickOutside(menuButtonRef, setIsMenuOpen);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const {
    isAuthenticated,
    username
  } = useStore(useAuthStore);

  return (
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
        className={`absolute top-[40px] right-0 w-[300px] bg-color3 rounded-md p-[24px] z-10`}
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
  )
}

export default UserMenu;