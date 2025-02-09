import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";


interface IDropdownButtonProps {
  children?: React.ReactNode | string;
  emptyStyle?: boolean;
  width?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  bgColor?: 'bg-color1' | 'bg-color2' | 'bg-color3' | 'bg-white';
  textColor?: 'text-color1' | 'text-color2' | 'text-color3' | 'text-white';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: any;
}

const DropdownButton : React.FC<IDropdownButtonProps> = (
  {children, emptyStyle, size='medium', bgColor, textColor, className="", disabled, ...props}
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
          {(Array.isArray(children)) && (children.length > 0) && (emptyStyle == false) ? (
            <button
              className={`${backgroundColor} ${selectedTextColor} ${textSize} rounded-full justify-center py-[12px] px-[24px] font-medium ${className}`}
              disabled={disabled}
              {...props}
            >
              {children[0]}
            </button>
          ) : (
            <button className={className} >
              {(Array.isArray(children)) && (children.length > 0) && children[0]}
            </button>
          )}
        </PopoverHandler>
        <PopoverContent
          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}
          className="p-0 border-none"
        >
          {(Array.isArray(children) && (children.length > 1) && children) && (
            children[1]
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DropdownButton;