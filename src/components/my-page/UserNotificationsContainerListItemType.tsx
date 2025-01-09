import { INotificationTemplate } from "@/models/notification.models";


const UserNotificationsContainerListItemType = (
  { templateData }: { templateData: INotificationTemplate }
) => {
  const style = { backgroundColor: templateData.type_data.color_code };

  return (
    <div className="text-[16px] w-[15%]">
      <p style={style} className="rounded-full px-[12px] py-[2px] truncate w-fit max-w-[90%] font-semibold">{templateData.type_data.display_names.Korean}</p>
    </div>
  );
}

export default UserNotificationsContainerListItemType;