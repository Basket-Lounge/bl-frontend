import { UserInquiriesPaginationResult } from "@/models/user.models";
import { httpClient } from "./http";


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