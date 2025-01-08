interface IUserMenuContentButtonProps {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  disabled?: boolean;
}

const UserMenuContentButton = (
  { handleClick, text, disabled }: IUserMenuContentButtonProps
) => {
  return (
    <button
      onClick={handleClick}
      className="text-white text-[16px] font-medium py-[16px]"
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default UserMenuContentButton;