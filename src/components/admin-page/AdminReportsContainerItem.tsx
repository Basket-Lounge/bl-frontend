import { IReportWithoutUserData } from "@/models/user.models";
import { extractInquiryTypeNameInKorean } from "@/utils/user.utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


interface IAdminReportsContainerItemProps {
  report: IReportWithoutUserData
}

const AdminReportsContainerItem = ({ report }: IAdminReportsContainerItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.push(pathname + '?' + createQueryString('report', report.id.toString()));
  }

  const reportTypeInKorean = extractInquiryTypeNameInKorean(report.type_data);
  const boxBgColor = report.resolved ? "bg-[#16A34A]" : "bg-color3";

  return (
    <div 
      className={"p-[24px] rounded-md flex items-center justify-between " + boxBgColor}
      onClick={handleClick}
    >
      <div className="flex gap-[24px] items-center">
        <div className="w-[64px] h-[64px] rounded-full bg-white"></div>
        <div className="flex flex-col gap-[12px]">
          <p className="font-semibold text-[16px]">{report.title}</p>
          <div className="px-[32px] py-[2px] bg-white rounded-full text-color1 text-[14px] font-semibold">{reportTypeInKorean}</div>
        </div>
      </div>
      {report.resolved && (
        <div>
          <Image
            src="/icons/check_circle_24dp_FFFFFF.svg"
            alt="Checkmark"
            width={32}
            height={32}
          />
        </div>
      )}
    </div>
  );
}

export default AdminReportsContainerItem;