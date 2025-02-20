export type TInquiryChannelType = "all" | "unassigned" | "assigned" | "solved" | "unsolved" | "mine";
export const inquiryChannelTypes: TInquiryChannelType[] = ["all", "unassigned", "assigned", "solved", "unsolved", "mine"];

export type TReportType = "all" | "unsolved" | "solved";

export type TAdminUsersSection = 'account-settings' | 'posts' | 'comments' | 'dms';

export interface IChatBlacklist {
    bans: IChatBanEntry[];
    mutes: IChatMuteEntry[];
}

export interface IChatBanEntry {
    user_data: {
        id: number;
        username: string;
    },
    chat_data: {
        game_data: {
            game_id: string;
        }
    },
    message_data: {
        message: string;
        created_at: string;
        updated_at: string;
    } | null,
    disabled: boolean;
    reason: string;
    created_at: string;
}

export interface IChatMuteEntry extends IChatBanEntry {
    mute_until: string | null;
}