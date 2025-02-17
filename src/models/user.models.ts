export interface IRole {
  id: number;
  name: string;
  description: string;
  weight: number;
}

export interface IUser {
  id: number;
  username: string;
  email?: string;
  role_data: IRole;
  level: number;
  created_at: string;
  introduction: string;
  is_profile_visible: boolean;
  likes_count: number;
  liked?: boolean;
  chat_blocked: boolean;
  favorite_team: {id: string, symbol: string};
  login_notification_enabled?: boolean;
}

export interface IUpdateUserIntroduction {
  introduction: string;
}

export interface IUpdateProfileVisibility {
  is_profile_visible: boolean;
}

export interface MyPageComment {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  replies_count: number;
  likes_count: number;
  liked?: boolean;
  user_data: {
    id: number;
    username: string;
  };
  status_data: {
    id: number;
    name: string;
  },
  post_data: {
    id: string;
    title: string;
    team_data: {
      id: number;
      symbol: string;
    },
    user_data: {
      id: number;
      username: string;
    }
  }
}

export interface UserChat {
  id: string;
  participants: UserChatParticipants[];
  created_at: string;
  updated_at: string;
}

export interface UserChatParticipants {
  id: string;
  user_data: {
    id: number;
    username: string;
    favorite_team: {
      id: string;
      symbol: string
    } | null;
  };
  messages?: UserChatMessage[];
  last_message?: UserChatMessage;
  unread_messages_count: number;
}

export interface UserChatMessage {
  id?: string;
  updated_at?: string;
  message: string;
  created_at: string;
}

export interface UserChatMessageWithUserData extends UserChatMessage {
  user_data: {
    id: number;
    username: string;
    favorite_team: {
      id: string;
      symbol: string
    } | null;
  };
}

export interface UserLikes {
  id: string;
  likes_count: number;
  liked?: boolean;
}

export interface InquiryType {
  id: number;
  display_names: InquiryTypeDisplayName[];
  name: string;
  description: string;
}

export interface InquiryTypeDisplayName {
  id: number;
  display_name: string;
  language_data: {
    name: string;
  }
}

export interface InquiryCreateErrors {
  inquiry_type?: string[];
  title?: string[];
  message?: string[];
  non_field_errors?: string[];
}

export interface InquiryMessage {
  id: string;
  message: string;
  created_at: string;
  updated_at: string;
  user_type: "User" | "Moderator";
  user_id: number;
  user_username: string;
  user_favorite_team: {
    id: string;
    symbol: string
  } | null;
}

export interface UserInquiry {
  id: string;
  title: string;
  inquiry_type_data: InquiryType;
  created_at: string;
  updated_at: string;
  last_message?: {
    message: string;
    created_at: string;
  } | null;
  unread_messages_count?: number;
  last_read_at: string;
  moderators: UserInquiryModerator[];
  solved: boolean;
}

export interface UserInquiryWithUserData extends UserInquiry {
  user_data: {
    id: number;
    username: string;
  };
}

export interface UserInquiryWithUserDataFavoriteTeam extends UserInquiry {
  user_data: {
    id: number;
    username: string;
    favorite_team: {
      id: string;
      symbol: string
    } | null;
  };
}

export interface UserInquiryModerator {
  id: string;
  inquiry_data?: UserInquiry;
  moderator_data: {
    id: number;
    username: string;
    favorite_team: {
      id: string;
      symbol: string
    } | null;
  };
  last_read_at: string;
  unread_messages_count?: number;
  assigned_at?: string;
  in_charge?: boolean;
  last_message?: UserChatMessage | null;
}

export interface IReport {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  accuser_data: {
    id: number;
    username: string;
  };
  accused_data: {
    id: number;
    username: string;
  };
  resolved: boolean;
  type_data: IReportType;
}

export type IReportWithoutUserData = Omit<IReport, 'accuser_data' | 'accused_data'>;

export interface IReportType {
  id: number;
  name: string;
  description: string;
  display_names: IReportTypeDisplayName[];
}

export interface IReportTypeDisplayName {
  id: number;
  display_name: string;
  language_data: {
    name: string;
  }
}

export interface IReportCreateErrors {
  title?: string[];
  description?: string[];
  report_type?: string[];
  accused?: string[];
  non_field_errors?: string[];
}