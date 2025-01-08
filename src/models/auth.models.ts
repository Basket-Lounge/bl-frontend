export interface IRefreshTokenResponse {
  username: string;
  email: string;
  id: number;
  role: number;
}

export interface IInitialLoginResponse {
  access: string;
  refresh: string;
  user: {
    pk: number;
    username: string;
    email: string;
  };
}