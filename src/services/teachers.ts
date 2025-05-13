import { QueryFunction } from "@tanstack/react-query";
import { createAxiosInstance } from "./axiosInstance";
import { ApiResponse } from "../types/common";
import { Student } from "../types/students";
import { Option } from "../types/common";
const baseURL = import.meta.env.VITE_BASE_URL;
const axiosInstance = createAxiosInstance(baseURL);

type GetAllStudentResponse = ApiResponse<Student[]>;

export const getAllTeachers: QueryFunction<Student[]> = async (): Promise<
  Student[]
> => {
  try {
    const response = await axiosInstance.get<GetAllStudentResponse>(
      `/teachers`
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

export const getTeacherList: QueryFunction<Option[]> = async (): Promise<
  Option[]
> => {
  try {
    const response = await axiosInstance.get<GetAllStudentResponse>(
      `/teachers`
    );

    return response.data.data.map((teacher) => ({
      name: teacher.name,
      id: teacher.id.toString(),
    }));
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};
type CreateTeacherRequest = {
  name: string;
  email: string;
  password: string;
};

type CreateTeacherResponse = ApiResponse<{
  registrationNumber: string;
  userId: number;
}>;

export const createTeacher = async (
  data: CreateTeacherRequest
): Promise<{ registrationNumber: string; userId: number }> => {
  try {
    const response = await axiosInstance.post<CreateTeacherResponse>(
      `/teachers`,
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
