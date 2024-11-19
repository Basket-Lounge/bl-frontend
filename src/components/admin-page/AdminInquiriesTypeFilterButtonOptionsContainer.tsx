import { TInquiryChannelType } from "@/models/admin.models";
import AdminInquiriesFilterButtonOption from "./AdminInquiriesFilterButtonOption";

const AdminInquiriesTypeFilterButtonOptionsContainer = () => {
  const queryKey = "filter";

  return (
    <div 
      className="absolute w-[300px] bg-color3 rounded-md p-[24px] z-10 flex gap-[16px] flex-wrap top-[100%] left-0"
    >
      <AdminInquiriesFilterButtonOption<TInquiryChannelType>
        name="전체" 
        queryKey={queryKey} 
        queryValue="all" 
      />
      <AdminInquiriesFilterButtonOption<TInquiryChannelType>
        name="미해결" 
        queryKey={queryKey} 
        queryValue="unsolved"
      />
      <AdminInquiriesFilterButtonOption<TInquiryChannelType>
        name="해결" 
        queryKey={queryKey} 
        queryValue="solved"
      />
      <AdminInquiriesFilterButtonOption<TInquiryChannelType>
        name="미배정"
        queryKey={queryKey}
        queryValue="unassigned"
      />
      <AdminInquiriesFilterButtonOption<TInquiryChannelType>
        name="배정"
        queryKey={queryKey}
        queryValue="assigned"
      />
      <AdminInquiriesFilterButtonOption<TInquiryChannelType>
        name="자신 배정"
        queryKey={queryKey}
        queryValue="mine"
      />
    </div>
  )
}

export default AdminInquiriesTypeFilterButtonOptionsContainer;