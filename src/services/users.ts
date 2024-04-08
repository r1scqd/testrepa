import { axiosInstance } from "./index.ts";

export interface UsersResponse {
  role: "teacher" | "student",
  name: string,
  lastname: string,
  username: string
}


export async function usersMe() {
  console.log("users me");
  return await axiosInstance.get<UsersResponse>("/users/me");
}
