import useClickOutside from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import AdminInquiriesTypeFilterButtonOptionsContainer from "./AdminInquiriesTypeFilterButtonOptionsContainer";


interface IAdminInquiriesFilterButtonProps {
  name: string;
  queryKey: string;
};

const AdminInquiriesTypeFilterButton : React.FC<IAdminInquiriesFilterButtonProps> = ({ name, queryKey }) => {
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
        <AdminInquiriesTypeFilterButtonOptionsContainer />
      )}
    </button>
  )
}

export default AdminInquiriesTypeFilterButton;