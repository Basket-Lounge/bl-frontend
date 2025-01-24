import { Spinner } from "@material-tailwind/react";

interface IImageButtonProps {
  children: React.ReactNode;
  width?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  bgColor?: 'bg-color1' | 'bg-color2' | 'bg-color3' | 'bg-white';
  textColor?: 'text-color1' | 'text-color2' | 'text-color3' | 'text-white';
  className?: string;
  onClick?: () => void;
  pending?: boolean;
  disabled?: boolean;
}

const ImageButton = ({ 
  children,
  size='medium', 
  onClick,
  pending, 
  disabled, 
  className 
}: IImageButtonProps) => {
  const spinnerSize = size === 'small' ? 
    'w-[14px] w-[14px]' : size === 'medium' ? 
    'w-[16px] h-[16px]' : size === 'large' ? 
    'w-[24px] h-[24px]' : 'w-[32px] h-[32px]';

  if (className) {
    return (
      <button 
        onClick={onClick}
        className={className}
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
      className={className}
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

export default ImageButton;