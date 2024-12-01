import Image from "next/image";
import UserMenuContainer from "./UserMenuContainer";
import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";


const UserMenu = () => {
  return (
    <div>
      <Popover
        placement="bottom"
      >
        <PopoverHandler>
          <button>
            <Image
              src="/icons/menu_24dp_FFFFFF.svg"
              alt="menu"
              width={28}
              height={20}
            />
          </button>
        </PopoverHandler>
        <PopoverContent 
          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}
          className="p-0 border-none z-50"
        >
          <UserMenuContainer />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default UserMenu;