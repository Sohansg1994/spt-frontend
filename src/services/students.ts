import { QueryFunction } from "@tanstack/react-query";
import { createAxiosInstance } from "./axiosInstance";
import { ApiResponse } from "../types/common";
import { Student } from "../types/students";
const baseURL = import.meta.env.VITE_BASE_URL;
const axiosInstance = createAxiosInstance(baseURL);

type GetAllStudentResponse = ApiResponse<Student[]>;

export const getAllStudents: QueryFunction<Student[]> = async (): Promise<
  Student[]
> => {
  try {
    const response = await axiosInstance.get<GetAllStudentResponse>(
      `/students`
    );

    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};
export const getAllStudentsWithClasses: QueryFunction<
  Student[]
> = async (): Promise<Student[]> => {
  try {
    const response = await axiosInstance.get<GetAllStudentResponse>(
      `/students/classes`
    );

    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};
type CreateStudentRequest = {
  name: string;
  email: string;
  password: string;
  gradeLevel: string;
};

type CreateStudentResponse = ApiResponse<{
  registrationNumber: string;
  userId: number;
}>;

export const createStudent = async (
  data: CreateStudentRequest
): Promise<{ registrationNumber: string; userId: number }> => {
  try {
    const response = await axiosInstance.post<CreateStudentResponse>(
      `/students`,
      data
    );

    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};
