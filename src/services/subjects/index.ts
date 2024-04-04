export interface SubjectBase {
  name: string,
  spending: string
}


export interface Subject extends SubjectBase {
  id: number;
}
