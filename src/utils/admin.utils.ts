import { TInquiryChannelType } from "@/models/admin.models";

export const determineAdminInquirySubscriptionChannelName = (
  inquiryChannelType: TInquiryChannelType, 
  userId: number
) => {
  switch (inquiryChannelType) {
    case "all":
      return "moderators/inquiries/all/updates";
    case "unassigned":
      return "moderators/inquiries/unassigned/updates";
    case "assigned":
      return "moderators/inquiries/assigned/updates";
    case "solved":
      return "moderators/inquiries/solved/updates";
    case "unsolved":
      return "moderators/inquiries/unsolved/updates";
    case "mine":
      return `moderators/${userId}/inquiries/updates`;
    default:
      return "moderators/inquiries/all/updates";
  }
};