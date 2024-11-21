import { IReport, IReportPaginationResult, IRole, IUser, IUserPaginationResult, UserInquiriesPaginationResult } from "@/models/user.models";
import { httpClient } from "./http";
import { Team } from "@/models/team.models";


export const getAllRoles = async () => {
  const response = await httpClient.get<IRole[]>('/api/admin/users/roles/');
  return response.data as IRole[];
}

export const getAllUsers = async (
  page: number,
  roles?: string, 
  sort?: string,
  search?: string
) => {
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());

  if (roles) {
    searchParams.set('roles', roles);
  }
  if (sort) {
    searchParams.set('sort', sort);
  }
  if (search) {
    searchParams.set('search', search);
  }

  const response = await httpClient.get<IUserPaginationResult>(`/api/admin/users/?${searchParams.toString()}`);
  return response.data as IUserPaginationResult;
}

export const getUserPosts = async (
  userId: number,
  page: number,
  data: {
    sort?: string,
    search?: string,
    teams?: string,
    status?: string,
  }
) => {
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());

  const { sort, search, teams, status } = data;
  if (sort) {
    searchParams.set('sort', sort);
  }
  if (search) {
    searchParams.set('search', search);
  }
  if (status) {
    searchParams.set('status', status);
  }
  if (teams) {
    searchParams.set('teams', teams);
  }

  const response = await httpClient.get(`/api/admin/users/${userId}/posts/?${searchParams.toString()}`);
  return response.data;
}

export const getUser = async (userId: string) => {
  const response = await httpClient.get<IUser>(`/api/admin/users/${userId}/`);
  return response.data as IUser;
}

export const getAllInquiries = async (page: number) => {
  const response = await httpClient.get<UserInquiriesPaginationResult>(`/api/admin/inquiries/?page=${page}`);
  return response.data as UserInquiriesPaginationResult;
}

export const getUnassignedInquiries = async (page: number) => {
  const response = await httpClient.get<UserInquiriesPaginationResult>(`/api/admin/inquiries/unassigned/?page=${page}`);
  return response.data as UserInquiriesPaginationResult;
}

export const getAssignedInquiries = async (page: number) => {
  const response = await httpClient.get<UserInquiriesPaginationResult>(`/api/admin/inquiries/assigned/?page=${page}`);
  return response.data as UserInquiriesPaginationResult;
}

export const getSolvedInquiries = async (page: number) => {
  const response = await httpClient.get<UserInquiriesPaginationResult>(`/api/admin/inquiries/solved/?page=${page}`);
  return response.data as UserInquiriesPaginationResult;
}

export const getUnsolvedInquiries = async (page: number) => {
  const response = await httpClient.get<UserInquiriesPaginationResult>(`/api/admin/inquiries/unsolved/?page=${page}`);
  return response.data as UserInquiriesPaginationResult;
}

export const getMyInquiries = async (page: number) => {
  const response = await httpClient.get<UserInquiriesPaginationResult>(`/api/admin/inquiries/mine/?page=${page}`);
  return response.data as UserInquiriesPaginationResult;
}

export const createInquiryMessage = async (inquiryId: string, message: string) => {
  const response = await httpClient.post(`/api/admin/inquiries/${inquiryId}/messages/`, { message });
  return response.data;
}

export const updateInquiry = async (
  inquiryId: string, 
  solved?: boolean, 
  title?: string, 
  typeId?: number
) => {
  if (!solved && !title && !typeId) {
    throw new Error('At least one of the parameters should be provided');
  }

  const response = await httpClient.patch(
    `/api/admin/inquiries/${inquiryId}/`, 
    { solved, title, inquiry_type: typeId }
  );
  return response.data;
}

export const assignInquiry = async (inquiryId: string) => {
  const response = await httpClient.post(`/api/admin/inquiries/${inquiryId}/moderators/`);
  return response.data;
}

export const unassignInquiry = async (inquiryId: string) => {
  const response = await httpClient.delete(`/api/admin/inquiries/${inquiryId}/moderators/`);
  return response.data;
}

export const markInquiryAsSolved = async (inquiryId: string) => {
  const response = await httpClient.patch(`/api/admin/inquiries/${inquiryId}/`, { solved: true });
  return response.data;
}

export const markInquiryAsUnsolved = async (inquiryId: string) => {
  const response = await httpClient.patch(`/api/admin/inquiries/${inquiryId}/`, { solved: false });
  return response.data;
}

export const getAllReports = async (page: number) => {
  const response = await httpClient.get<IReportPaginationResult>(`/api/admin/reports/?page=${page}`);
  return response.data as IReportPaginationResult;
}

export const getUnresolvedReports = async (page: number) => {
  const response = await httpClient.get<IReportPaginationResult>(`/api/admin/reports/unresolved/?page=${page}`);
  return response.data as IReportPaginationResult;
}

export const getResolvedReports = async (page: number) => {
  const response = await httpClient.get<IReportPaginationResult>(`/api/admin/reports/resolved/?page=${page}`);
  return response.data as IReportPaginationResult;
}

export const resolveReport = async (reportId: string) => {
  const response = await httpClient.patch(`/api/admin/reports/${reportId}/`, { solved: true });
  return response.data;
}

export const unresolveReport = async (reportId: string) => {
  const response = await httpClient.patch(`/api/admin/reports/${reportId}/`, { solved: false });
  return response.data;
}

export const getReport = async (reportId: string) => {
  const response = await httpClient.get<IReport>(`/api/admin/reports/${reportId}/`);
  return response.data as IReport;
}

export const updateUserFavoriteTeams = async (userId: number, teams: Team[]) => {
  const teamIds : {id: number}[] = [];
  for (let i = 0; i < teams.length; i++) {
    teamIds.push({id: teams[i].id});
  };

  const response = await httpClient.put<Team[]>(`/api/admin/users/${userId}/favorite-teams/`, teamIds);
  return response.data as Team[];
}

export const updateUser = async (
  userId: number,
  data: {
    introduction?: string,
    is_profile_visible?: boolean,
    role?: string, 
    chat_blocked?: boolean,
  }
) => {
  const { introduction, is_profile_visible, role, chat_blocked } = data;
  if (!introduction && is_profile_visible === undefined && !role && chat_blocked === undefined) {
    throw new Error('At least one of the parameters should be provided');
  }

  const response = await httpClient.patch<IUser>(
    `/api/admin/users/${userId}/`, 
    { introduction, is_profile_visible, role, chat_blocked }
  );

  return response.data as IUser;
}

export const updatePost = async (
  postId: string,
  data: {
    title? : string,
    status? : number,
    content? : string
  }
) => {
  const { title, status, content } = data;
  if (!title && !status && !content) {
    throw new Error('At least one of the parameters should be provided');
  }
  if (typeof title === 'string' && title.length === 0) {
    throw new Error('title should not be empty');
  }
  if (typeof content === 'string' && content.length === 0) {
    throw new Error('content should not be empty');
  }

  const response = await httpClient.patch(`/api/admin/posts/${postId}/`, { status, content, title });
  return response.data;
}

export const deletePost = async (
  userId: number,
  postId: string
) => {
  const response = await httpClient.delete(`/api/admin/users/${userId}/posts/${postId}/`);
  return response.data;
}