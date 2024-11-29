export interface IRefreshTokenResponse {
  username: string;
  email: string;
  id: number;
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