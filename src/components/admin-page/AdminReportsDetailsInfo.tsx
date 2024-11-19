import { IReportType } from "@/models/user.models";
import { extractInquiryTypeNameInKorean } from "@/utils/user.utils";


interface IAdminReportsDetailsInfoProps {
  reportType: IReportType;
  reportDescription: string;
  children: React.ReactNode;
}

const AdminReportsDetailsInfo = (
  { reportType, reportDescription, children }: IAdminReportsDetailsInfoProps
) => {
  const reportTypeNameInKorean = extractInquiryTypeNameInKorean(reportType);

  return (
    <div 
      className="p-[24px] flex flex-col items-stretch gap-[24px] overflow-auto"
    >
      <div className="flex flex-col gap-[16px] items-start">
        <h3 className="font-bold text-[16px]">신고 종류</h3>
        <p className={"text-[14px] font-semibold px-[32px] py-[2px] rounded-full bg-color1 text-white relative"}>
          {reportTypeNameInKorean}
        </p>
      </div>
      <div className="flex flex-col gap-[16px] items-start">
        <h3 className="font-bold text-[16px]">신고 내용</h3>
        <p className="text-[14px]">{reportDescription}</p>
      </div>
      {children}
    </div>
  )
}

export default AdminReportsDetailsInfo;