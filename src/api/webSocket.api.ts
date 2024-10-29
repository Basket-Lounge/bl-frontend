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