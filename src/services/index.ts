import axios from "axios";

export interface StatusResponse {
  status: string;
}

export enum AuthNeedIt {
  YES = "YES",
  NO = "NO",
}

export const authNeedItHeader = "X-AUTH-NEED-IT";

export const axiosInstance = axios.create({
  baseURL: "https://college-test.rescqd.space/api",
  withCredentials: true
});

let authToken: Nullable<string>;
axiosInstance.interceptors.request.use((r) => {
  if (authToken){
    r.headers.Authorization = `Bearer ${authToken}`
  }
  return r;
});


let onTokenExpired: Nullable<() => void> = null;

axiosInstance.interceptors.response.use(r => r, (error) => {
  console.log(`axios error: ${error}`);
  console.log(`current token: ${authToken}`);
  if (error.response?.status == 401 && onTokenExpired) {
    onTokenExpired();
  }
  throw error;
});
export const setAxiosAuthToken = (token: Nullable<string>) => {
  authToken = token;
};

export const setOnTokenExpired = (callback: () => void) => {
  console.log("setup on token expired");
  onTokenExpired = callback;
};
