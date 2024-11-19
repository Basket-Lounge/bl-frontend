import useClickOutside from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import AdminReportsTypeFilterButtonOptionsContainer from "./AdminReportsTypeFilterButtonOptionsContainer";


interface IAdminReportsFilterButtonProps {
  name: string;
};

const AdminReportsTypeFilterButton : React.FC<IAdminReportsFilterButtonProps> = ({ name }) => {
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
        <AdminReportsTypeFilterButtonOptionsContainer />
      )}
    </button>
  )
}

export default AdminReportsTypeFilterButton;