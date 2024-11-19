interface IAdminUsersFilterButtonOptionProps {
  name: string;
  value: string;
  clicked: boolean;
  handleClick: (value: string) => void;
};

const AdminUsersFilterButtonOption = (
  { name, value, handleClick, clicked } : IAdminUsersFilterButtonOptionProps
) => {
  const bgColor = clicked ? "bg-white" : "bg-color1";
  const textColor = clicked ? "text-color1" : "text-white";

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleClick(value);
    e.stopPropagation(); 
  }

  return (
    <button
      onClick={handleButtonClick}
      className={"text-[14px] font-semibold px-[32px] py-[2px] rounded-full " + bgColor + " " + textColor}
    >
      {name}
    </button>
  )
}

export default AdminUsersFilterButtonOption;