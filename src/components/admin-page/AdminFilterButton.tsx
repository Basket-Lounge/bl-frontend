import useClickOutside from "@/hooks/useClickOutside";
import { Suspense, useRef, useState } from "react";
import LoadingButton from "../common/LoadingButton";


interface IAdminFilterButtonProps {
  name: string;
  children?: React.ReactNode;
};

const AdminFilterButton : React.FC<IAdminFilterButtonProps> = (
  { name, children }
) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuButtonRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuButtonRef, setIsMenuOpen);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <Suspense fallback={<LoadingButton />}>
      <div 
        className="relative"
        ref={menuButtonRef}
      >
        <button
          onClick={handleClick}
          className={"text-[14px] font-semibold px-[32px] py-[2px] rounded-full bg-color3 text-white"}
        >
          {name}
        </button>
        {isMenuOpen && (
          children
        )}
      </div>
    </Suspense>
  )
}

export default AdminFilterButton;