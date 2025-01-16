import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";


interface IDropdownButtonProps {
  text: string | React.ReactNode;
  children?: React.ReactNode | string;
  width?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  bgColor?: 'bg-color1' | 'bg-color2' | 'bg-color3' | 'bg-white';
  textColor?: 'text-color1' | 'text-color2' | 'text-color3' | 'text-white';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const DropdownButton : React.FC<IDropdownButtonProps> = (
  {text, children, size='medium', bgColor, textColor, className, disabled}
) => {
  const backgroundColor = bgColor || 'bg-color1';
  const selectedTextColor = textColor || 'text-white';

  const textSize = size === 'small' ? 
    'text-[14px]' : size === 'medium' ? 
    'text-[16px]' : size === 'large' ? 
    'text-[24px]' : 'text-[32px]';

  return (
    <div className="relative">
      <Popover 
        placement="bottom"
      >
        <PopoverHandler>
          {(text && typeof text === 'string') ? (
            <button
              className={`${backgroundColor} ${selectedTextColor} ${textSize} rounded-full justify-center py-[12px] px-[24px] font-medium ${className}`}
              disabled={disabled}
            >
              {text}
            </button>
          ) : (
            <button>
              {text}
            </button>
          )}
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
  )
}

export default DropdownButton;