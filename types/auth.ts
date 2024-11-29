export interface User {
  uid: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthError {
  error: string;
}

export enum AuthMode {
  LOGIN = "login",
  SIGNUP = "signup",
}
