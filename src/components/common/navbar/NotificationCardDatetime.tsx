import { timeAgoKorean } from "@/utils/common.utils";

interface INotificationCardDatetimeProps {
  datetime: string;
}

const NotificationCardDatetime = ({ datetime }: INotificationCardDatetimeProps) => {
  const timeAgoInKorean = timeAgoKorean(datetime);

  return (
    <p className="text-[12px] lg:text-[14px] text-gray-400">
      {timeAgoInKorean}
    </p>
  )
}

export default NotificationCardDatetime;