import { StudentBase } from "./index.ts";
import { axiosInstance } from "../index.ts";


export interface StudentsResponse{
  students: Array<StudentBase>
}


export async function getStudents() {
  return axiosInstance.get<StudentsResponse>("/teachers/students")
}
