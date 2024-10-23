import { jwtDecode } from "jwt-decode";

interface IAccessToken {
  [key: string]: string | number;
}

export const extractIdFromToken = (token: string): IAccessToken => {
  return jwtDecode(token);
};