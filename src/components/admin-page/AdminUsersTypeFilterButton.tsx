import useClickOutside from "@/hooks/useClickOutside";
import { Suspense, useRef, useState } from "react";
import AdminUsersTypeFilterButtonOptionsContainer from "./AdminUsersTypeFilterButtonOptionsContainer";


interface IAdminUsersFilterButtonProps {
  name: string;
};

const AdminUsersTypeFilterButton : React.FC<IAdminUsersFilterButtonProps> = ({ name }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useClickOutside(menuButtonRef, setIsMenuOpen);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <button
      onClick={handleClick}
      className={"text-[14px] font-semibold px-[32px] py-[2px] rounded-full bg-color3 text-white relative"}
      ref={menuButtonRef}
    >
      {name}
      {isMenuOpen && (
        <Suspense fallback={<div>로딩중...</div>}>
          <AdminUsersTypeFilterButtonOptionsContainer />
        </Suspense>
      )}
    </button>
  )
}

export default AdminUsersTypeFilterButton;