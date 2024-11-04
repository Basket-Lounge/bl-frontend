import { IUpdateProfileVisibility, IUpdateUserIntroduction, IUser, MyPageCommentsPaginationResult } from "@/models/user.models";
import { httpClient } from "./http";
import { TeamPostPaginationResult } from "@/models/team.models";


export const getMyInfo = async () => {
  const response = await httpClient.get<IUser>("/api/users/me/");
  return response.data;
}

export const getMyPosts = async (page: number) => {
  const response = await httpClient.get<TeamPostPaginationResult>(`/api/users/me/posts/?page=${page}`);
  return response.data as TeamPostPaginationResult;
}

export const getMyComments = async (page: number) => {
  const response = await httpClient.get<MyPageCommentsPaginationResult>(`/api/users/me/comments/?page=${page}`);
  return response.data as MyPageCommentsPaginationResult;
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