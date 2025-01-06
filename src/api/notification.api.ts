import { INotificationPaginationResult } from "@/models/notification.models";
import { httpClient } from "./http";


export const getUnreadNotificationCount = async () => {
  const response = await httpClient.get<{ count: number }>("/api/users/me/notifications/unread/count/");
  return response.data ? response.data.count : 0;
}

export const markAllNotificationsAsRead = async () => {
  await httpClient.patch("/api/users/me/notifications/");
}

export const getAllNotifications = async (
  page: number,
  data: {
    sort?: string;  
  }
) => {
  const { sort } = data;
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());

  if (sort) {
    searchParams.set('sort', sort);
  }
  const response = await httpClient.get<INotificationPaginationResult>("/api/users/me/notifications/?"+searchParams.toString());
  return response.data;
}

export const getUnreadNotifications = async (
  page: number,
  data: {
    sort?: string;  
  }
) => {
  const { sort } = data;
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());

  if (sort) {
    searchParams.set('sort', sort);
  }
  const response = await httpClient.get<INotificationPaginationResult>("/api/users/me/notifications/unread/?"+searchParams.toString());
  return response.data;
}