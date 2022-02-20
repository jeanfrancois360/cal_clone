export interface AppState {
  auth: AuthState;
  error: ErrorState;
}

export interface AuthState {
  isLoading: boolean;
  isAuth: boolean;
  token: string;
  user: { username: string, email: string };
  message: string;
}

export interface ErrorState {
  error: string;
}
