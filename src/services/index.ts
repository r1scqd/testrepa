import axios from "axios";

export enum AuthNeedIt {
  YES = "YES",
  NO = "NO",
}

export const authNeedItHeader = "X-AUTH-NEED-IT";

export const axiosInstance = axios.create({
  baseURL: "https://college-test.rescqd.space/api",
  withCredentials: true
});

let authToken: string;
axiosInstance.interceptors.request.use((r) => {

  if (!(r.headers.has(authNeedItHeader) && r.headers.get(authNeedItHeader) == AuthNeedIt.NO)) {
    r.headers.Authorization = `Bearer ${authToken}`;
  }
  return r;
});


let onTokenExpired: () => void;

axiosInstance.interceptors.response.use(r => r, (r) => {
  if (onTokenExpired != undefined) {
    onTokenExpired();
  }
  return r;
});
export const setAxiosAuthToken = (token: string) => {
  authToken = token;
};

export const setOnTokenExpired = (callback: () => void) => {
  onTokenExpired = callback;
};
