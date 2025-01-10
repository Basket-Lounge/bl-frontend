import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import Image from "next/image";


interface IUserNotificationsContainerListItemSettingsProps {
  children?: React.ReactNode;
}

const UserNotificationsContainerListItemSettings = (
  { children }: IUserNotificationsContainerListItemSettingsProps
) => {
  return (
    <div className="text-[16px] w-[5%]">
      <Popover
        placement="bottom"
      >
        <PopoverHandler>
          <button 
            className="relative"
          >
            <Image
              src="/icons/settings_24dp_FFFFFF.svg"
              alt="settings"
              width={24}
              height={24}
            />
          </button>
        </PopoverHandler>
        <PopoverContent
          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}
          className="p-0 border-none z-50"
        >
          {children}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default UserNotificationsContainerListItemSettings;