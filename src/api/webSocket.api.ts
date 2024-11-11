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

export const getSubscriptionTokenForLiveGameChat = async (gameId: number) => {
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