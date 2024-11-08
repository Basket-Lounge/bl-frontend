import { IUpdateProfileVisibility, IUpdateUserIntroduction, IUser, MyPageCommentsPaginationResult, UserChat, UserChatsPaginationResult, UserLikes } from "@/models/user.models";
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

export const getMyChats = async (page: number) => {
  const response = await httpClient.get<UserChatsPaginationResult>(`/api/users/me/chats/?page=${page}`);
  return response.data as UserChatsPaginationResult;
}

export const getUserInfo = async (userId: number) => {
  const response = await httpClient.get<IUser>(`/api/users/${userId}/`);
  return response.data;
}

export const getUserPosts = async (userId: number, page: number) => {
  const response = await httpClient.get<TeamPostPaginationResult>(`/api/users/${userId}/posts/?page=${page}`);
  return response.data as TeamPostPaginationResult;
}

export const getUserChat = async (userId: number) => {
  const response = await httpClient.get<UserChat>(`/api/users/me/chats/${userId}/`);
  return response.data as UserChat;
}

export const createUserChat = async (userId: number) => {
  const response = await httpClient.post(`/api/users/${userId}/chats/`);
  return response.data;
}

export const deleteUserChat = async (userId: number) => {
  const response = await httpClient.delete(`/api/users/me/chats/${userId}/`);
  return response.data;
}

export const blockUserChat = async (userId: number) => {
  const response = await httpClient.post(`/api/users/me/chats/${userId}/block/`);
  return response.data;
}

export const createUserChatMessage = async (userId: number, message: string) => {
  const response = await httpClient.post(`/api/users/me/chats/${userId}/messages/`, { message });
  return response.data;
}

export const getUserComments = async (userId: number, page: number) => {
  const response = await httpClient.get<MyPageCommentsPaginationResult>(`/api/users/${userId}/comments/?page=${page}`);
  return response.data as MyPageCommentsPaginationResult;
}

export const markChatAsRead = async (userId: number) => {
  const response = await httpClient.put(`/api/users/me/chats/${userId}/mark-as-read/`);
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

export const likeUser = async (userId: number) => {
  const response = await httpClient.post<UserLikes>(`/api/users/${userId}/likes/`);
  return response.data as UserLikes;
}

export const unlikeUser = async (userId: number) => {
  const response = await httpClient.delete<UserLikes>(`/api/users/${userId}/likes/`);
  return response.data as UserLikes;
}