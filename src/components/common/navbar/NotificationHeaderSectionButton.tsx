import { TNotificationSectionType, useNotificationStore } from "@/stores/notification.stores";
import ButtonLoading from "../ButtonLoading";


interface INotificationHeaderSectionButtonProps {
  pending: boolean;
  count: number | undefined;
  name: string;
  keyName: TNotificationSectionType;
}

const NotificationHeaderSectionButton = (
  { pending, count, name, keyName }: INotificationHeaderSectionButtonProps
) => {
  const {
    currentSection,
    setCurrentSection,
    setIsSectionChanged,
    setIsHeaderUnreadNotificationCountChanged,
  } = useNotificationStore();

  const handleClick = () => {
    setIsHeaderUnreadNotificationCountChanged(true);
    setIsSectionChanged(true);
    setCurrentSection(keyName);
  }

  if (pending) {
    return <ButtonLoading />
  }

  return (
    <button
      onClick={handleClick}
      className={
        "cursor-pointer text-white flex items-center gap-[8px] " +
        (currentSection === keyName ? "font-extrabold" : "")
      }
    >
      {name}
      {currentSection === keyName && (
        <span className="bg-[#DC0909] text-white text-[14px] font-semibold rounded-full py-[2px] px-[4px]">
          {count || 0}
        </span>
      )}
    </button>
  )
}

export default NotificationHeaderSectionButton;