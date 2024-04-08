import { axiosInstance, StatusResponse } from "../index.ts";

export interface SetMarkRequest {
  subject_id: number,
  mark: Nullable<string>
}

export async function setSubjectMark(it: SetMarkRequest) {
  return await axiosInstance.post<StatusResponse>('/students/subjects', it)
}
