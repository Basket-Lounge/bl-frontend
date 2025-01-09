import { INotification } from "@/models/notification.models";
import { timeAgoKorean } from "@/utils/common.utils";
import { Checkbox } from "@material-tailwind/react";
import UserNotificationsContainerListItemMessageParser from "./UserNotificationsContainerListItemMessageParser";
import UserNotificationsContainerListItemType from "./UserNotificationsContainerListItemType";


const UserNotificationsContainerListItem = (
  { notification }: { notification: INotification }
) => {
  const timeAgoInKorean = timeAgoKorean(notification.created_at);

  return (
    <div className="px-[8px] py-[16px] rounded-full flex items-center">
      <div className="w-[5%]">
        <Checkbox 
          color="blue"
          defaultChecked={false} 
          onPointerEnterCapture={() => {}} 
          onPointerLeaveCapture={() => {}}
          crossOrigin=""
          className="w-[16px] h-[16px]"
        />
      </div>
      <UserNotificationsContainerListItemMessageParser 
        message={notification.contents.Korean}
        redirectURL={notification.redirect_url}
      />
      <UserNotificationsContainerListItemType templateData={notification.template_data} />
      <p className="text-[16px] w-[20%]">{timeAgoInKorean}</p>
      <p className="text-[16px] w-[5%]">설정</p>
    </div>
  );
}

export default UserNotificationsContainerListItem;