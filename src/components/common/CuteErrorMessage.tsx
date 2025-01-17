
interface CuteErrorMessageProps {
  size?: 'small' | 'medium' | 'large';
  error: string;
}

const CuteErrorMessage = ({ error, size = 'medium' }: CuteErrorMessageProps) => {
  const emojiFontSize = size === 'small' ? 'text-[16px] lg:text-[24px]' : size === 'medium' ? 'text-[24px] lg:text-[32px]' : 'text-[32px] lg:text-[48px]';
  const messageFontSize = size === 'small' ? 'text-[14px] lg:text-[16px]' : size === 'medium' ? 'text-[16px] lg:text-[24px]' : 'text-[24px] lg:text-[32px]';

  return (
    <div className="flex flex-col gap-[16px] items-stretch text-white">
      <p className={`font-bold ${emojiFontSize} text-center`}>
        (つ╥﹏╥)つ
      </p>
      <p className={`font-bold ${messageFontSize} text-center`}>
        {error}
      </p>
    </div>
  )
}

export default CuteErrorMessage;