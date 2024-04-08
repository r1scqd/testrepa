import { Subject } from "./index.ts";
import { axiosInstance } from "../index.ts";

export interface SubjectExt extends Subject {
  is_available: boolean;
  mark: Nullable<string>
}

export interface SubjectsResponse {
  subjects: Array<SubjectExt>;
}

export async function getSubjects() {
  return await axiosInstance.get<SubjectsResponse>("/students/subjects");
}
