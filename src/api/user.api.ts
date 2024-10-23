import { IUpdateProfileVisibility, IUpdateUserIntroduction, IUser } from "@/models/user.models";
import { httpClient } from "./http";


export const getMyInfo = async () => {
  const response = await httpClient.get<IUser>("/api/users/me/");
  return response.data;
}

export const getUserInfo = async (userId: number) => {
  const response = await httpClient.get<IUser>(`/api/users/${userId}/`);
  return response.data;
}

export const updateUserIntroduction = async (introduction: string) => {
  const response = await httpClient.put<IUpdateUserIntroduction>("/api/users/me/introduction/", { introduction });
  return response.data;
}

export const updateUserProfileVisibility = async (isProfileVisible: boolean) => {
  const response = await httpClient.put<IUpdateProfileVisibility>("/api/users/me/profile-visibility/", { is_profile_visible: isProfileVisible });
  return response.data;
}