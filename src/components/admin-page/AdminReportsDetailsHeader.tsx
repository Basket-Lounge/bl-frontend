interface IAdminReportsDetailsHeaderProps {
  createdAt: string;
  accused: {id: number, username: string};
  accuser: {id: number, username: string};
}

const AdminReportsDetailsHeader = (
  { createdAt, accused, accuser }: IAdminReportsDetailsHeaderProps
) => {
  return (
    <div className={"divide-white divide-y bg-color3"}>
      <div className="divide-white overflow-auto p-[24px]">
        <h3 className="font-bold text-[16px]">신고자</h3>
        <div className={"flex justify-between items-center relative mt-[16px] gap-[24px]"}>
          <div className="w-[48px] h-[48px] rounded-full bg-white flex items-center justify-center">
          </div>
          <div className="flex flex-col items-start gap-[12px] overflow-x-hidden grow">
            <div className="flex flex-col gap-[12px] items-start">
              <p className="font-semibold text-[16px] line-clamp-1">{accuser.username}</p>
              <p className="text-[14px]">{createdAt}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="divide-white overflow-auto p-[24px]">
        <h3 className="font-bold text-[16px]">피신고자</h3>
        <div className={"flex justify-between items-center relative mt-[16px] gap-[24px]"}>
          <div className="w-[48px] h-[48px] rounded-full bg-white flex items-center justify-center">
          </div>
          <div className="flex flex-col items-start gap-[12px] overflow-x-hidden grow">
            <div className="flex flex-col gap-[12px] items-start">
              <p className="font-semibold text-[16px] line-clamp-1">{accused.username}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminReportsDetailsHeader;