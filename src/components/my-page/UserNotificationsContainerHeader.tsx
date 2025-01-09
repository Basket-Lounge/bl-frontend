import { Checkbox } from "@material-tailwind/react";


const UserNotificationsContainerHeader = () => {
  return (
    <div className="p-[8px] rounded-full bg-color1 flex items-center">
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
      <p className="text-[16px] font-medium grow">내용</p>
      <p className="text-[16px] font-medium w-[15%]">알림 종류</p>
      <p className="text-[16px] font-medium w-[20%]">생성 날짜</p>
      <p className="text-[16px] font-medium w-[5%]">설정</p>
    </div>
  );
}

export default UserNotificationsContainerHeader;