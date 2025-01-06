import ButtonLoading from "./ButtonLoading";

interface ITextButtonProps {
  text: string;
  size: 'small' | 'medium' | 'large';
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  pending?: boolean;
  disabled?: boolean;
}

const TextButton = ({text, size, handleClick, pending, disabled}: ITextButtonProps) => {
  const fontSize = size === 'small' ? 'text-[14px] lg:text-[16px]' : size === 'medium' ? 'text-[16px] lg:text-[24px]' : 'text-[24px] lg:text-[32px]';

  if (pending) {
    return (
      <button className={`text-white ${fontSize}`} disabled>
        <ButtonLoading />
      </button>
    )
  }

  return (
    <button className={`text-white ${fontSize}`} onClick={handleClick} disabled={disabled}>
      {text}
    </button>
  )
}

export default TextButton;