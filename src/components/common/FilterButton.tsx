import { Suspense } from "react";
import LoadingButton from "./LoadingButton";
import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";


interface IFilterButtonProps {
  name: string;
  children?: React.ReactNode;
  [key: string]: any;
};

const FilterButton : React.FC<IFilterButtonProps> = (
  { name, children, ...props }
) => {
  return (
    <Suspense fallback={<LoadingButton />}>
      <div 
        className="relative"
      >
        <Popover 
          placement="bottom"
        >
          <PopoverHandler>
            <button
              className={"text-[14px] font-semibold px-[32px] py-[2px] rounded-full bg-color3 text-white"}
              {...props}
            >
              {name}
            </button>
          </PopoverHandler>
          <PopoverContent
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
            className="p-0 border-none"
          >
            {children}
          </PopoverContent>
        </Popover>
      </div>
    </Suspense>
  )
}

export default FilterButton;