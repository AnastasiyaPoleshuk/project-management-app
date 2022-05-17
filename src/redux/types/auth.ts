interface authState {
  token: string | null;
  isAuth: boolean;
  isLoading: boolean;
  error: Error | null;
}

export type { authState };
