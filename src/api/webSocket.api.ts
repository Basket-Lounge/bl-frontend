import { httpClient } from "./http";


export const getConnectionToken = async () => {
  const response = await httpClient.get("/api/token/websocket-access/");
  return response.data;
}

export const getSubscriptionToken = async (channelName: string) => {
  const encodedChannelName = encodeURIComponent(channelName);
  const response = await httpClient.get("/api/token/subscription/?channel=" + encodedChannelName);
  return response.data;
}

export const getSubscriptionTokenForLiveGameChat = async (gameId: string) => {
  const response = await httpClient.get("/api/token/subscription/games/" + gameId + "/live-chat/");
  return response.data;
}

export const getSubscriptionTokenForLiveUserChat = async (chatId: string) => {
  const response = await httpClient.get("/api/token/subscription/users/chats/" + chatId + "/");
  return response.data;
}

export const getSubscriptionTokenForLiveChatUpdate = async () => {
  const response = await httpClient.get("/api/token/subscription/users/chat-updates/");
  return response.data;
}

export const getSubscriptionTokenForLiveInquiryChat = async (inquiryId: string) => {
  const response = await httpClient.get("/api/token/subscription/users/inquiries/" + inquiryId + "/");
  return response.data;
}

export const getSubscriptionTokenForLiveInquiriesUpdate = async () => {
  const response = await httpClient.get("/api/token/subscription/users/inquiry-updates/");
  return response.data;
}

export const getSubscriptionTokenForLiveAdminInquiriesUpdate = async () => {
  const response = await httpClient.get("/api/token/subscription/admin/inquiry-updates/");
  return response.data;
}

export const getSubscriptionTokenForLiveAdminInquiriesUnassignedUpdate = async () => {
  const response = await httpClient.get("/api/token/subscription/admin/inquiry-updates/unassigned/");
  return response.data;
}

export const getSubscriptionTokenForLiveAdminInquiriesAssignedUpdate = async () => {
  const response = await httpClient.get("/api/token/subscription/admin/inquiry-updates/assigned/");
  return response.data;
}

export const getSubscriptionTokenForLiveAdminInquiriesUnsolvedUpdate = async () => {
  const response = await httpClient.get("/api/token/subscription/admin/inquiry-updates/unsolved/");
  return response.data;
}

export const getSubscriptionTokenForLiveAdminInquiriesSolvedUpdate = async () => {
  const response = await httpClient.get("/api/token/subscription/admin/inquiry-updates/solved/");
  return response.data;
}

export const getSubscriptionTokenForLiveAdminInquiriesMineUpdate = async () => {
  const response = await httpClient.get("/api/token/subscription/admin/inquiry-updates/mine/");
  return response.data;
}

export const getSubscriptionTokenForLiveAdminInquiryChat = async (inquiryId: string) => {
  const response = await httpClient.get("/api/token/subscription/admin/inquiries/" + inquiryId + "/");
  return response.data;
}