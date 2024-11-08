
export interface IRole {
  id: number;
  name: string;
  description: string;
  weight: number;
}

export interface IUser {
  username: string;
  email?: string;
  role: IRole;
  level: number;
  introduction: string;
  is_profile_visible: boolean;
  likes_count: number;
  liked?: boolean;
}

export interface IUpdateUserIntroduction {
  introduction: string;
}

export interface IUpdateProfileVisibility {
  is_profile_visible: boolean;
}

export interface MyPageCommentsPaginationResult {
    count: number;
    next: string;
    previous: string;
    results: MyPageComment[];
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

export interface UserChatsPaginationResult {
  count: number;
  next: string;
  previous: string;
  results: UserChat[];
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
  };
  messages?: UserChatMessage[];
  last_message?: UserChatMessage;
  unread_messages_count: number;
}

export interface UserChatMessage {
  id: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface UserChatMessageWithUserData extends UserChatMessage {
  user_data: {
    id: number;
    username: string;
  };
}

export interface UserLikes {
  id: string;
  likes_count: number;
  liked?: boolean;
}