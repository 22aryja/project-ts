export interface IAuthToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  ttl: number;
}

export const AuthConstants = {
  localStorageKey: "auth-token",
};
