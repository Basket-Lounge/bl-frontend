
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