import UserInquiriesCreateButton from "./UserInquiriesCreateButton";
import UserInquiriesSearchBox from "./UserInquiriesSearchBox";


const UserInquiriesFilter = () => {
  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <p className="text-[20px] font-bold">사이트 문의</p>
      </div>
      <div className="flex gap-[24px] items-center">
        <UserInquiriesCreateButton />
        <UserInquiriesSearchBox />
      </div>
    </div>
  );
}

export default UserInquiriesFilter;