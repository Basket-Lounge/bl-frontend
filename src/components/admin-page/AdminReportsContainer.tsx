import { IReportWithoutUserData } from "@/models/user.models";
import AdminReportsContainerItem from "./AdminReportsContainerItem";


interface IAdminReportsContainerProps {
  reports: IReportWithoutUserData[];
}

const AdminReportsContainer = ({ 
  reports
}: IAdminReportsContainerProps) => {
  if (reports.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <p className="font-bold text-[32px]">
          (つ╥﹏╥)つ
        </p>
        <p className="font-bold text-[24px]">
          포스트가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="gap-[24px] items-stretch flex flex-col">
      {reports.map((report) => (
        <AdminReportsContainerItem key={report.id} report={report} />
      ))}
    </div>
  );
}

export default AdminReportsContainer;