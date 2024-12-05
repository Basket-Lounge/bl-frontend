'use client'


interface IAdminReportsStatusFilterButtonOptionProps {
  name: string;
  value: string;
  currentValue: string;
  handleFilterChange: (value: string) => void;
};

const AdminReportsStatusFilterButtonOption = (
  { name, value, currentValue, handleFilterChange }: IAdminReportsStatusFilterButtonOptionProps
) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleFilterChange(value);
  }

  const bgColor = currentValue === value ? "bg-white" : "bg-color1";
  const textColor = currentValue === value ? "text-color1" : "text-white";

  return (
    <button
      onClick={handleClick}
      className={"text-[14px] font-semibold px-[32px] py-[2px] rounded-full " + bgColor + " " + textColor}
    >
      {name}
    </button>
  )
}

export default AdminReportsStatusFilterButtonOption;