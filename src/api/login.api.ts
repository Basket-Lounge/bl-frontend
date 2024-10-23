import { IRefreshTokenResponse } from "@/models/auth.models";
import { httpClient, httpClientFormData } from "./http";


export const submitGoogleLoginCode = async (code: string) => {
  const formData = new FormData();
  formData.append("code", code);

  const response = await httpClientFormData.post("/dj-rest-auth/google/", formData);
  return response.data;
}

export const refreshAccessToken = async () => {
  const response = await httpClient.post<IRefreshTokenResponse>("/api/token/refresh/");
  return response.data;
}