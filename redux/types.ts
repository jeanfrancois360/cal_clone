export interface AppState {
  auth: AuthState;
  loader: LoaderState;
  error: ErrorState;
}

export interface AuthState {
  isAuth: boolean;
  access_token: string;
  user: { username: string, email: string };
  message: string;
}

export interface LoaderState{
  isLoading: boolean;
}

export interface ErrorState {
  error: string;
}
