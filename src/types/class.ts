export type Class = {
  id: number;
  name: string;
  type: string;
  batchYear: number;
  teacherId: number;
  subjectId: number;
  instituteId: number;
  subjectName?: string;
  teacherName?: string;
};

export type ClassSummary = {
  id: number;
  name: string;
  teacherName: string;
  totalEnrolled: number;
};
