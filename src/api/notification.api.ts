import { INotification, INotificationTemplateType } from "@/models/notification.models";
import { httpClient } from "./http";
import { IPaginationResult } from "@/models/common.models";


export const getUnreadNotificationCount = async () => {
  const response = await httpClient.get<{ count: number }>("/api/users/me/notifications/unread/count/");
  return response.data ? response.data.count : 0;
}

export const markAllNotificationsAsRead = async () => {
  await httpClient.patch("/api/users/me/notifications/");
}

export const markNotificationAsRead = async (notificationId: string) => {
  await httpClient.patch(`/api/users/me/notifications/${notificationId}/`);
}

export const deleteNotification = async (notificationId: string) => {
  await httpClient.delete(`/api/users/me/notifications/${notificationId}/`);
}

export const deleteAllNotifications = async () => {
  await httpClient.delete("/api/users/me/notifications/");
}

export const getAllNotifications = async (
  page: number,
  data: {
    sort?: string;  
    types?: string;
    context?: string;
  }
) => {
  const { sort, context, types } = data;
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());

  if (sort) {
    searchParams.set('sort', sort);
  }

  if (types) {
    searchParams.set('types', types);
  }

  if (context) {
    searchParams.set('context', context);
  }

  const response = await httpClient.get<IPaginationResult<INotification>>("/api/users/me/notifications/?"+searchParams.toString());
  return response.data;
}

export const getUnreadNotifications = async (
  page: number,
  data: {
    sort?: string;  
    context?: string;
  }
) => {
  const { sort, context } = data;
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());

  if (sort) {
    searchParams.set('sort', sort);
  }

  if (context) {
    searchParams.set('context', context);
  }

  const response = await httpClient.get<IPaginationResult<INotification>>("/api/users/me/notifications/unread/?"+searchParams.toString());
  return response.data;
}

export const getNotificationTypes = async () => {
  const response = await httpClient.get<INotificationTemplateType[]>("/api/notifications/types/");
  return response.data as INotificationTemplateType[];
}