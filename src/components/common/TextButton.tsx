import ButtonLoading from "./ButtonLoading";


interface ITextButtonProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  pending?: boolean;
  disabled?: boolean;
  className?: string;
  [key: string]: any;
}

const TextButton = ({
  text, 
  size='medium', 
  handleClick, 
  pending, 
  disabled, 
  className,
  ...props
}: ITextButtonProps) => {
  const fontSize = size === 'small' ? 
    'text-[14px] lg:text-[16px]' : size === 'medium' ? 
      'text-[16px] lg:text-[24px]' : 'text-[24px] lg:text-[32px]';
  const buttonClassName = className ? className : '';

  if (pending) {
    return (
      <button 
        className={`${fontSize} ${buttonClassName}`} 
        aria-disabled={disabled}
        disabled
        {...props}
      >
        <ButtonLoading />
      </button>
    )
  }

  return (
    <button 
      className={`${fontSize} ${buttonClassName}`} 
      onClick={handleClick} 
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  )
}

export default TextButton;