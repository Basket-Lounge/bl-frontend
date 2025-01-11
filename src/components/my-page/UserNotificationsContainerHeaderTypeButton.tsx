import { INotificationTemplateType } from "@/models/notification.models";


interface IUserNotificationsContainerHeaderTypeButtonProps {
  type: INotificationTemplateType;
  onClick?: (type: string) => void;
  clicked?: boolean;
}

const UserNotificationsContainerHeaderTypeButton = (
  { type, onClick, clicked }: IUserNotificationsContainerHeaderTypeButtonProps
) => {
  const clickedText = clicked ? "text-white" : "text-black";

  const handleClick = () => {
    if (onClick) {
      onClick(type.id.toString());
    }
  }

  return (
    <button
      className={"rounded-full px-[12px] py-[2px] truncate w-fit max-w-[90%] font-semibold " + clickedText}
      style={{ backgroundColor: clicked ? type.color_code : "#FFFFFF" }}
      onClick={handleClick}
    >
      {type.display_names.Korean}
    </button>
  )
}

export default UserNotificationsContainerHeaderTypeButton;