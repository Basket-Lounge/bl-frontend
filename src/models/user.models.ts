
export interface IRole {
  id: number;
  name: string;
  description: string;
  weight: number;
}

export interface IUser {
  username: string;
  email: string;
  role: IRole;
  level: number;
  introduction: string;
  is_profile_visible: boolean;
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