export type Student = {
  id: number;
  registrationNumber: string;
  name: string;
  email: string;
  classes?: StudentClass[];
  gradeLevel?: string;
};

export type StudentClass = {
  classId: number;
  name: string;
};
