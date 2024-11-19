import { TInquiryChannelType } from "@/models/admin.models";
import AdminReportsFilterButtonOption from "./AdminReportsFilterButtonOption";

const AdminReportsTypeFilterButtonOptionsContainer = () => {
  const queryKey = "filter";

  return (
    <div 
      className="absolute w-[300px] bg-color3 rounded-md p-[24px] z-10 flex gap-[16px] flex-wrap top-[100%] left-0"
    >
      <AdminReportsFilterButtonOption<TInquiryChannelType>
        name="전체" 
        queryKey={queryKey} 
        queryValue="all" 
      />
      <AdminReportsFilterButtonOption<TInquiryChannelType>
        name="미해결" 
        queryKey={queryKey} 
        queryValue="unsolved"
      />
      <AdminReportsFilterButtonOption<TInquiryChannelType>
        name="해결" 
        queryKey={queryKey} 
        queryValue="solved"
      />
    </div>
  )
}

export default AdminReportsTypeFilterButtonOptionsContainer;