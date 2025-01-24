export type TInquiryChannelType = "all" | "unassigned" | "assigned" | "solved" | "unsolved" | "mine";
export const inquiryChannelTypes: TInquiryChannelType[] = ["all", "unassigned", "assigned", "solved", "unsolved", "mine"];

export type TReportType = "all" | "unsolved" | "solved";

export type TAdminUsersSection = 'account-settings' | 'posts' | 'comments' | 'dms';