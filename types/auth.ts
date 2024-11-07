export interface User {
  email: string;
  editsRemaining: number;
  totalEdits: number;
  resumeUploaded: boolean;
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
