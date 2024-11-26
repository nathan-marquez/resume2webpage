export interface User {
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
