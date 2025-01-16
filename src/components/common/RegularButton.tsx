import { Spinner } from "@material-tailwind/react";

interface IRegularButtonProps {
  children?: React.ReactNode | string;
  width?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  bgColor?: 'bg-color1' | 'bg-color2' | 'bg-color3' | 'bg-white';
  textColor?: 'text-color1' | 'text-color2' | 'text-color3' | 'text-white';
  className?: string;
  onClick?: () => void;
  pending?: boolean;
  disabled?: boolean;
}

const RegularButton = ({ 
  children,
  size='medium', 
  width='w-fit',
  onClick,
  pending, 
  disabled, 
  bgColor, 
  textColor, 
  className 
}: IRegularButtonProps) => {
  const backgroundColor = bgColor || 'bg-color1';
  const selectedTextColor = textColor || 'text-white';

  const textSize = size === 'small' ? 
    'text-[14px]' : size === 'medium' ? 
    'text-[16px]' : size === 'large' ? 
    'text-[24px]' : 'text-[32px]';
  const spinnerSize = size === 'small' ? 
    'w-[14px] w-[14px]' : size === 'medium' ? 
    'w-[16px] h-[16px]' : size === 'large' ? 
    'w-[24px] h-[24px]' : 'w-[32px] h-[32px]';

  if (className) {
    return (
      <button 
        onClick={onClick}
        className={`${width} ${backgroundColor} ${selectedTextColor} ${textSize} rounded-full justify-center py-[12px] px-[24px] font-medium ${className}`}
        disabled={disabled}
      >
        {pending ? (
          <Spinner 
            color="light-blue" 
            className={spinnerSize} 
            onPointerEnterCapture={() => {}} 
            onPointerLeaveCapture={() => {}} 
          />
        ) : (
          children
        )}
      </button>
    )
  }

  return (
    <button 
      onClick={onClick}
      className={width + " rounded-full justify-center py-[12px] px-[24px] font-medium " + textSize + " " + backgroundColor + " " + selectedTextColor}
      disabled={disabled}
    >
      {pending ? (
        <Spinner 
          color="light-blue" 
          className={spinnerSize} 
          onPointerEnterCapture={() => {}} 
          onPointerLeaveCapture={() => {}} 
        />
      ) : (
        children
      )}
    </button>
  )
}

export default RegularButton;