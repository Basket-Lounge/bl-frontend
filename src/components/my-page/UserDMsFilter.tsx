import UserDMsSearchBox from "./UserDMsSearchBox";


const UserDMsFilter = () => {
  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <p className="text-[20px] font-bold">개인 채팅</p>
      </div>
      <div className="flex gap-[24px] items-center">
        <UserDMsSearchBox />
      </div>
    </div>
  );
}

export default UserDMsFilter;