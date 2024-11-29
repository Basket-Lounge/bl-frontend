import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import { useRef, useState } from "react";
import UserMenuContainer from "./UserMenuContainer";


const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuButtonContainerRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuButtonContainerRef, setIsMenuOpen);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div ref={menuButtonContainerRef} className="relative">
      <button 
        onClick={handleMenuClick}
      >
        <Image
          src="/icons/menu_24dp_FFFFFF.svg"
          alt="menu"
          width={28}
          height={20}
        />
      </button>
      {isMenuOpen && <UserMenuContainer />}
    </div>
  )
}

export default UserMenu;