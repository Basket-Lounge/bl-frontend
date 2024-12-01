import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getReport, resolveReport, unresolveReport } from "@/api/admin.api";
import AdminReportsDetailsHeader from "./AdminReportsDetailsHeader";
import AdminReportsDetailsInfo from "./AdminReportsDetailsInfo";
import AdminReportsDetailsResolveButton from "./AdminReportsDetailsResolveButton";
import SpinnerLoading from "../common/SpinnerLoading";


interface IAdminReportsDetailsProps {
  reportId: string;
}

const AdminReportsDetails = ({ reportId }: IAdminReportsDetailsProps) => {
  const reportQuery = useSuspenseQuery({
    queryKey: ['admin', 'reports', 'details', reportId],
    queryFn: async () => {
      return await getReport(reportId);
    }
  });
  const [realReport, setRealReport] = useState(reportQuery.data);

  const resolveMutation = useMutation({
    mutationFn: async () => {
      return resolveReport(reportId);
    },
    onSuccess: () => {
      setRealReport({
        ...realReport,
        resolved: true
      });
    }
  })

  const unresolveMutation = useMutation({
    mutationFn: async () => {
      return unresolveReport(reportId);
    },
    onSuccess: () => {
      setRealReport({
        ...realReport,
        resolved: false
      });
    }
  })

  const handleResolve = () => {
    if (realReport.resolved) {
      unresolveMutation.mutate();
      return;
    }

    resolveMutation.mutate();
  }

  // Update report whenever a new Inquiry is selected from the list
  useEffect(() => {
    reportQuery.refetch();
  }, [reportId]);

  // Update report whenever a new Inquiry is received from the API
  // This gets triggered right after the refetch() call inside the useEffect above
  useEffect(() => {
    if (reportQuery.isSuccess) {
      setRealReport(reportQuery.data);
    }
  }, [reportQuery.data]);

  if (reportQuery.isRefetching) {
    return <SpinnerLoading />;
  }

  return (
    <div className="bg-color3 rounded-md divide-y divide-white overflow-auto">
      <AdminReportsDetailsHeader
        createdAt={realReport.created_at}
        accused={realReport.accused_data}
        accuser={realReport.accuser_data}
      />
      <AdminReportsDetailsInfo
        reportType={realReport.type_data}
        reportDescription={realReport.description}
      >
        <AdminReportsDetailsResolveButton 
          resolved={realReport.resolved}
          onResolve={handleResolve}
          isPending={resolveMutation.isPending || unresolveMutation.isPending}
        />
      </AdminReportsDetailsInfo>
    </div>
  )
}

export default AdminReportsDetails;