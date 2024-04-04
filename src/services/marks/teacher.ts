import { Subject } from "../subjects";
import { axiosInstance } from "../index.ts";

export interface Marks {
  [username: string]: Array<{
    mark: Nullable<string>,
    subject_id: number
  }>;
}

export interface Students {
  [username: string]: {
    name: string,
    lastname: string
  };
}

export interface MarksResponse {
  marks: Marks;
  students: Students;
  subjects: Array<Subject>;
}

export async function getMarks() {
  return await axiosInstance.get<MarksResponse>("/teachers/marks");
}
