
interface CuteErrorMessageProps {
  size?: 'small' | 'medium' | 'large';
  error: string;
  [key: string]: any;
}

const CuteErrorMessage = ({ error, size = 'medium', ...props }: CuteErrorMessageProps) => {
  const emojiFontSize = size === 'small' ? 'text-[16px] lg:text-[24px]' : size === 'medium' ? 'text-[24px] lg:text-[32px]' : 'text-[32px] lg:text-[48px]';
  const messageFontSize = size === 'small' ? 'text-[14px] lg:text-[16px]' : size === 'medium' ? 'text-[16px] lg:text-[24px]' : 'text-[24px] lg:text-[32px]';

  return (
    <div 
      aria-invalid="true"
      aria-errormessage="cute-error-message"
      className="flex flex-col gap-[16px] items-stretch text-white" 
      {...props}
    >
      <p className={`font-bold ${emojiFontSize} text-center`}>
        (つ╥﹏╥)つ
      </p>
      <p className={`font-bold ${messageFontSize} text-center`} id="cute-error-message">
        {error}
      </p>
    </div>
  )
}

export default CuteErrorMessage;