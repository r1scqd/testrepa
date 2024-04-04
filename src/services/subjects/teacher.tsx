import { axiosInstance, StatusResponse } from "../index.ts";
import { Subject, SubjectBase } from "./index.ts";


export interface SubjectsResponse {
  subjects: Array<Subject>;
}

export async function getSubjects() {
  return await axiosInstance.get<SubjectsResponse>("/teachers/subjects");
}

export async function createSubject(it: SubjectBase) {
  return await axiosInstance.post<StatusResponse>("/teachers/subjects", it);
}

export async function editSubject(it: Subject) {
  return await axiosInstance.patch<StatusResponse>("/teachers/subjects", it);
}

export async function deleteSubject(it: { id: number }) {
  return await axiosInstance.get<StatusResponse>(`/teachers/subjects/delete/${it.id}`);
}
