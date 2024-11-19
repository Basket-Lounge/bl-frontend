import { 
  InquiryType, 
  IReportType, 
  IUpdateProfileVisibility, 
  IUpdateUserIntroduction, 
  IUser, 
  MyPageCommentsPaginationResult, 
  UserChat, 
  UserChatsPaginationResult, 
  UserInquiryWithUserData, 
  UserLikes 
} from "@/models/user.models";
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

export const getMyInquiries = async (page: number) => {
  const response = await httpClient.get(`/api/users/me/inquiries/?page=${page}`);
  return response.data;
}

export const getInquiry = async (inquiryId: string) => {
  const response = await httpClient.get<UserInquiryWithUserData>(`/api/inquiries/${inquiryId}/`);
  return response.data as UserInquiryWithUserData;
}

export const getInquiryTypes = async () => {
  const response = await httpClient.get<InquiryType[]>(`/api/inquiries/types/`);
  return response.data as InquiryType[];
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

export const createInquiryMessage = async (inquiryId: string, message: string) => {
  const response = await httpClient.post(`/api/users/me/inquiries/${inquiryId}/messages/`, { message });
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

export const markInquiryAsRead = async (inquiryId: string) => {
  const response = await httpClient.put(`/api/users/me/inquiries/${inquiryId}/mark-as-read/`);
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

export const createInquiry = async (
  title: string, 
  message: string, 
  inquiryTypeId: number
) => {
  const response = await httpClient.post(
    `/api/inquiries/`, 
    { title, message, inquiry_type: inquiryTypeId }
  );
  return response.data;
}

export const getReportTypes = async () => {
  const response = await httpClient.get<IReportType[]>(`/api/reports/types/`);
  return response.data as IReportType[];
}

export const createReport = async (
  title: string, 
  description: string,
  reportTypeId: number,
  accusedUserId: number
) => {
  if (isNaN(accusedUserId)) {
    throw new Error('accusedUserId should be a number');
  }

  const response = await httpClient.post(
    `/api/reports/`, 
    { 
      title, 
      description, 
      report_type: reportTypeId, 
      accused: accusedUserId 
    }
  );
  return response.data;
}