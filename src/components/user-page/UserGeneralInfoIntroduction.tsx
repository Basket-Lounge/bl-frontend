const UserGeneralInfoIntroduction = ({introduction}: {introduction: string}) => {
  return (
    <div className="w-full">
      <label className="text-white text-[20px] font-bold block">자기 소개</label>
      <p className="mt-[16px] text-[16px]">{introduction}</p>
    </div>
  );
}

export default UserGeneralInfoIntroduction;