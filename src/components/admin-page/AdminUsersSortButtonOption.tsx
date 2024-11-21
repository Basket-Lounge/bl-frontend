interface IAdminUsersSortButtonOptionProps {
  name: string;
  sortValue: (sort: string) => void;
  currentValue: boolean | null;
};

const AdminUsersSortButtonOption = (
  { name, sortValue, currentValue }: IAdminUsersSortButtonOptionProps
) => {
  
  const ascendingOrderButtonBgColor = currentValue === true ? "bg-white" : "bg-color1";
  const ascendingOrderButtonTextColor = currentValue === true ? "text-color1" : "text-white";

  const descendingOrderButtonBgColor = currentValue === false ? "bg-white" : "bg-color1";
  const descendingOrderButtonTextColor = currentValue === false ? "text-color1" : "text-white";

  return (
    <div className="flex flex-col gap-[12px]">
      <h3 className="text-[14px] font-bold text-left">{name}</h3>
      <div className="flex gap-[8px]">
        <button 
          className={"px-[12px] py-[2px] rounded-full w-full font-bold text-[14px] " + ascendingOrderButtonBgColor + " " + ascendingOrderButtonTextColor}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            sortValue('asc');
            e.stopPropagation();
          }}
        >
          오름차순
        </button>
        <button 
          className={"px-[12px] py-[2px] rounded-full w-full font-bold text-[14px] " + descendingOrderButtonBgColor + " " + descendingOrderButtonTextColor}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            sortValue('desc');
            e.stopPropagation();
          }}
        >
          내림차순
        </button>
      </div>
    </div>
  )
}

export default AdminUsersSortButtonOption;