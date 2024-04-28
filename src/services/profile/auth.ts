import { AuthNeedIt, authNeedItHeader, axiosInstance } from "../index.ts";

export interface AuthRequest {
  username: string,
  password: string
}

export interface AuthResponse {
  token: string;
}

export async function signIn({ username, password }: AuthRequest) {
  const headers = axiosInstance.defaults.headers.post;
  headers[authNeedItHeader] = AuthNeedIt.NO;
  return await axiosInstance.post<AuthResponse>("/login", { username, password }, { headers });
}


export async function signInCheck() {
  return await axiosInstance.get("login/check")
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}
