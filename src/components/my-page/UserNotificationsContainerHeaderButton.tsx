import { Suspense } from "react";
import ButtonLoading from "../common/ButtonLoading";
import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";


interface IUserNotificationsContainerHeaderButtonProps {
  text: string;
  queryKey?: string;
  className?: string;
  children?: React.ReactNode;
}

const UserNotificationsContainerHeaderButton = (
  { text, queryKey, className, children }: IUserNotificationsContainerHeaderButtonProps
) => {
  const searchParams = useSearchParams();
  const query = searchParams.get(queryKey || '') || '';

  const buttonTextColor = query ? 'text-green-200' : 'text-white';

  return (
    <Suspense fallback={<ButtonLoading />}>
      <div 
        className={className}
      >
        <Popover 
          placement="bottom"
        >
          <PopoverHandler>
            <button className={buttonTextColor}>
              {text}
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

export default UserNotificationsContainerHeaderButton;